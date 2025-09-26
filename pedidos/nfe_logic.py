import requests
from django.conf import settings
from .models import Pedido
from accounts.models import Endereco

def emitir_nfe_de_produto(pedido: Pedido):
    if pedido.nfe_id or pedido.nfe_status == 'Processing':
        print(f"Emissão de NF para o pedido {pedido.id} já está em andamento ou foi concluída.")
        return
    
    print(f"Iniciando emissão de NF-e para o pedido {pedido.id}...")

    endereco_cliente = Endereco.objects.filter(usuario=pedido.usuario).first()
    if not pedido.usuario.profile.cpf or not endereco_cliente:
        print(f"Erro: Não é possível emitir NF para o pedido {pedido.id}. Faltam dados essenciais (CPF ou Endereço).")
        pedido.nfe_status = 'Error_Data_Missing'
        pedido.save()
        return

    NFEIO_API_KEY = settings.NFEIO_API_KEY
    NFEIO_COMPANY_ID = settings.NFEIO_COMPANY_ID

    url = f"https://api.nfse.io/v2/companies/{NFEIO_COMPANY_ID}/productinvoices"
    headers = {"Authorization": NFEIO_API_KEY, "Content-Type": "application/json"}

    payload = {
        "number": str(pedido.id),
        "type": "Online",
        "purpose": "Normal",
        "buyer": {
            "federalTaxNumber": pedido.usuario.profile.cpf,
            "name": pedido.usuario.get_full_name(),
            "email": pedido.usuario.email,
            "address": {
                "postalCode": endereco_cliente.cep,
                "street": endereco_cliente.rua,
                "number": endereco_cliente.numero,
                "district": endereco_cliente.bairro,
                "city": {"name": endereco_cliente.cidade},
                "state": endereco_cliente.estado,
                "country": "BRA"
            }
        },
        "items": [
            {
                "ncmCode": item.produto.ncm,
                "description": item.produto.titulo,
                "quantity": item.quantidade,
                "unitAmount": float(item.produto.preco)
            } for item in pedido.items.all()
        ]
    }
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()

        response_data = response.json()

        pedido.nfe_status = 'Processing'
        pedido.save()

        print(f"Requisição de NF-e para o pedido {pedido.id} enviada com sucesso. Aguardando webhook de confirmação.")
        return True, response_data
    
    except requests.exceptions.RequestException as e:
        print(f"Erro ao solicitar NF-e para o pedido {pedido.id}: {e.response.text if e.response else str(e)}")
        pedido.nfe_status = 'Error'
        pedido.save()
        return False, str(e)