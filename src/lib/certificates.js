import createCert from "create-cert";

export async function createCertificate(commonName, days = 7) {
  return await createCert({ commonName, days });
}
