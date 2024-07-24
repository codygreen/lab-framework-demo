import fs from "fs"
import path from "path"
import remarkGfm from "remark-gfm";
import emoji from "remark-emoji";
import { compileMDX } from "next-mdx-remote/rsc"
import { ApiCheck } from "@/app/components/apicheck"
import { CodeBlock } from "../components/codeblock";
import { Docker } from "../components/docker";
import { DOCS_PATH } from "../utils/mdxUtils";

const components = {
  ApiCheck,
  CodeBlock,
  Docker,
  h1: (props) => <h1 id={props.children.toLowerCase().replace(/\s/g, "-")} {...props} />,
  h2: (props) => <h2 id={props.children.toLowerCase().replace(/\s/g, "-")} {...props} />,
  h3: (props) => <h3 id={props.children.toLowerCase().replace(/\s/g, "-")} {...props} />,
  h4: (props) => <h4 id={props.children.toLowerCase().replace(/\s/g, "-")} {...props} />,
  code: (props) => <CodeBlock {...props} />
}

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, emoji],
  },
  parseFrontmatter: true
}

export default async function Page({ params }) {
  const docsFilePath = path.join(DOCS_PATH, `${params.doc}.mdx`);
  const source = fs.readFileSync(docsFilePath, "utf8");
  const { content, frontmatter } = await compileMDX({
    source: source,
    components: components,
    options: options,
  })
  return (
    <>
      <div className="post-header">
        <h1>{frontmatter.title}</h1>
        {frontmatter.description && (
          <p className="description">{frontmatter.description}</p>
        )}
      </div>
      {content}
    </>)
}