export type subscription = {
  uuid: string,
  transportName: string,
  eventNames: string[],
  updated: string,
  destination: string,
  contactEmail: string,
  status: string,
  signingKey: string,
}