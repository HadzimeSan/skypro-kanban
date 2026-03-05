import { LoaderStyled, Spinner } from './Loader.styled'

function Loader() {
  return (
    <LoaderStyled>
      <Spinner />
      <span>Данные загружаются…</span>
    </LoaderStyled>
  )
}

export default Loader
