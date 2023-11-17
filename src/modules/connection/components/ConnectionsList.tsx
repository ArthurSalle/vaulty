import { Connection } from '../helpers/create-connection'
import { Separator } from '@/components/ui/separator'
import { ConnectionsListItem } from './ConnectionsListItem'

type ConnectionsListProps = {
  connectionsList: Connection[]
}

export const ConnectionsList = ({ connectionsList }: ConnectionsListProps) => {
  return (
    <ul className='flex flex-col h-full overflow-y-auto'>
      {connectionsList.length === 0 ? (
        <span className='block py-4 text-center text-muted-foreground'>
          <i>No connections found</i>
        </span>
      ) : (
        connectionsList.map((connection, index) => {
          return (
            <div key={connection.id}>
              <li className='flex items-center'>
                <ConnectionsListItem connection={connection} />
              </li>

              {index !== connectionsList.length - 1 ? <Separator /> : null}
            </div>
          )
        })
      )}
    </ul>
  )
}
