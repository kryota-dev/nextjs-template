import Script from 'next/script'
import { useId } from 'react'

import type { Thing, WithContext } from 'schema-dts'

/**
 * JSON-LDを埋め込むコンポーネント
 * @param jsonld - JSON-LDのデータ
 * @returns JSON-LDを埋め込むコンポーネント
 */
export function JsonLD<T extends Thing>({
  jsonld,
}: {
  jsonld: WithContext<T>
}) {
  const id = useId()
  return (
    <Script
      id={`jsonld-${id}`}
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
    />
  )
}
