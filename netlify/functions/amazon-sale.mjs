import { createClient } from "microcms-js-sdk"

export default async (req, context) => {
  const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY
  })
  const requestDate = new Date()
  const requestDateString = requestDate.toJSON()
  try {
    const response = await client.get({
      endpoint: 'amazon-sale',
      queries: {
        filters: `from[less_than]${requestDateString}[and]to[greater_than]${requestDateString}`
      }
    })
    return Response.json(response)
  } catch (err) {
    console.log(err)
    return Response.json({ error: err.toString })
  }
}
