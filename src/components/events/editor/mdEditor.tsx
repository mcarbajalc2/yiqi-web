'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string>(`

# Bienvenido al Editor de Markdown

Puedes usar **negrita**, *cursiva*, o ~~tachado~~.

- Elemento de lista 1
- Elemento de lista 2

1. Elemento numerado 1
2. Elemento numerado 2

> Esto es una cita en bloque

[Enlace a Google](https://www.google.com)

![Texto alternativo para una imagen](/placeholder.svg?height=100&width=100)

\`\`\`javascript
console.log("Este es un bloque de código");
\`\`\`

### Cómo incrustar un video de YouTube:

Para incrustar un video de YouTube, usa el siguiente formato:
\`\`\`html
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
\`\`\`
Reemplaza \`VIDEO_ID\` con el ID del video que deseas incrustar.

### Ejemplo de un video de YouTube incrustado:
<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Este código insertará el video en el documento Markdown.
`)

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted Markdown:', markdown)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Edita La descripción del evento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative border border-input rounded-md overflow-hidden bg-background">
              <textarea
                value={markdown}
                onChange={handleInput}
                className="w-full h-[400px] p-4 outline-none font-mono resize-none bg-transparent"
                aria-label="Markdown input"
              />
            </div>
            <div className="border border-input rounded-md overflow-hidden bg-white">
              <div className="h-[400px] p-4 overflow-auto prose prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]} // Enable raw HTML rendering
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus as any}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          </div>
          <CardFooter className="px-0">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
