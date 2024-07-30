import { useParams } from "react-router-dom"

// TODO: implement separate establishment preview page
const Establishment = () => {
  const params = useParams<{
    id: string
  }>()

  return <main>Establishment {params.id}</main>
}

export default Establishment
