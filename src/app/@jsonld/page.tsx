import { HOME_URL } from '@/constants/HOME_URL'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants'

import { JsonLD } from './_components'

import type { WebSite, WithContext } from 'schema-dts'

export default function HomeJsonLD() {
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: HOME_URL,
  } as const satisfies WithContext<WebSite>

  return <JsonLD jsonld={jsonld} />
}
