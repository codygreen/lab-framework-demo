"use client";

export async function DownloadItem({ item, fileName }) {

  const file = new Blob([item], {
    type: "text/plain"
  });

  return (
    <a download={fileName} target="_blank" rel="noreferrer" href={URL.createObjectURL(file)} style={{
      textDecoration: "inherit",
      color: "inherit",
    }}>
      <button className="px-3 right-2 top-2 bg-gray-700 text-white p-1 rounded-md hover:bg-gray-600 focus:outline-none">Download</button>
    </a>
  )
}
