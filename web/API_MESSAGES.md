# API de mensagens

## `POST /api/messages`

Recebe `name`, `contact`, `topic`, `source` e `message`. Todos os campos são obrigatórios.

- Aceita os assuntos: `web`, `ti` e `assistencia-tecnica`.
- Limita os tamanhos de texto para impedir envios acidentais ou excessivos.
- Normaliza espaços antes de salvar.
- Bloqueia novos envios do mesmo IP por 15 segundos.
- Retorna `201` lógico (resposta com `ok: true` e a mensagem criada) ou erro `400`/`429`.

## `GET /api/messages`

Lista as mensagens mais recentes. Aceita `topic`, `limit` (máximo 100) e `offset` (começa em 0).
Também retorna `meta` com total, limite e deslocamento.

## `PATCH /api/messages/:id`

Recebe `{ "read": true }` para marcar uma mensagem como lida ou `{ "read": false }` para voltar a marcá-la como não lida.

## `DELETE /api/messages/:id`

Exclui permanentemente a mensagem indicada pelo identificador.

> Antes de publicar, proteja esta rota e a página `messagesView.vue` com autenticação. Ela contém dados de contato enviados por visitantes.
