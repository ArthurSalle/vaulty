import { Separator } from '@/components/ui/separator'
import { Identity } from '../helpers/create-identity'
import { IdentitiesListItem } from './IdentitiesListItem'

type IdentitiesListProps = {
  identities: Identity[]
}

export const IdentitiesList = ({ identities }: IdentitiesListProps) => {
  return (
    <ul className='flex flex-col h-full overflow-y-auto'>
      {identities.length === 0 ? (
        <span className='block py-4 text-center text-muted-foreground'>
          <i>No identities found</i>
        </span>
      ) : (
        identities.map((identity, i) => {
          return (
            <div key={identity.id}>
              <IdentitiesListItem identity={identity} />

              {i !== identities.length - 1 ? <Separator /> : null}
            </div>
          )
        })
      )}
    </ul>
  )
}
