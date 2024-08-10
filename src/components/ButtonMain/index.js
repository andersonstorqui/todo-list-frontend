import * as C from './style'

const ButtonMain = ( {Text, onClick, Type = 'button'} ) => {
  return (
    <C.Div>
      <C.Button type={Type} onClick={onClick}>
        {Text}
      </C.Button>
    </C.Div>
  )
}

export default ButtonMain