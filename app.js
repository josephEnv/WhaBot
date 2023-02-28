const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')


const flujoA = addKeyword(["A", "a"])
  .addAnswer(["A"])


const flowPrincipal = addKeyword(["hola", "que tal", "buenas", "hello"])
  .addAnswer(["!Hola¡ Bienvenido a Sacfinpro, ¿Cómo podemos ayudarte?"])
  .addAnswer(["*(A)* Soporte tecnico - Tengo un inconveniente en el sistema", "*(B)* Atención al cliente - Pagos pendientes", "*(C)* Ventas - Contrata el sistema - Obten el demo"], {
    delay: 1500
  }, null, [flujoA])

const main = async () => {
  const adapterDB = new JsonFileAdapter()
  const adapterFlow = createFlow([flowPrincipal])
  const adapterProvider = createProvider(BaileysProvider)

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  })

  QRPortalWeb()
}

main()
