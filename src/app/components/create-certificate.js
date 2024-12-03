import { Suspense } from "react"
import { createCertificate } from "@/lib/certificates";
import { DownloadItem } from "@/app/components/download-item";
import { CodeBlockCopy } from "@/app/components/codeblock-copy";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
/**
 * Asynchronously retrieves a newly created certificate and key and displays it within a React component.
 *
 * @param {string} commonName - The host name for the certificate to create.
 * @returns {JSX.Element|string} - A React component displaying the certificate value, or an error message if the certificate cannot be retrieved.
 *
 * @example
 * <CreateCertificate name="www.example.com" />
 */
export async function CreateCertificate({ commonName }) {
  if (!commonName) return "commonName empty";

  let value = null;

  try {
    value = await createCertificate(commonName);

  } catch (error) {
    console.error(`unable to retrieve certificate ${commonName}: ${error.message}`);
    return "Error retrieving certificate";
  }

  return (
    <span>
      <Suspense fallback={"loading..."}>
        <span className="pr-4">Certificate for <span className="font-bold italic">{commonName}</span></span>
        <DownloadItem item={value.cert} fileName={`${commonName}.crt.pem`} />
        <div className="relative bg-gray-800 rounded-lg">
          <CodeBlockCopy>{value.cert}</CodeBlockCopy>
          <SyntaxHighlighter
            style={solarizedlight}
            PreTag="div"
            language="pem"
          >
            {value.cert}
          </SyntaxHighlighter>
        </div>
        <span className="pr-4">Key for <span className="font-bold italic">{commonName}</span></span>
        <DownloadItem item={value.key} fileName={`${commonName}.key.pem`} />
        <div className="relative bg-gray-800 rounded-lg">
          <CodeBlockCopy>{value.key}</CodeBlockCopy>
          <SyntaxHighlighter
            style={solarizedlight}
            PreTag="div"
            language="pem"
          >
            {value.key}
          </SyntaxHighlighter>
        </div>
      </Suspense>
    </span>
  );
}
