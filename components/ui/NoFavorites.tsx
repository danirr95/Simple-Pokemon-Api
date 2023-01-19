
import { Container, Text, Image } from '@nextui-org/react';

export const NoFavorites = () => {
  return (
    <Container css={{
        display: 'flex',
        flexDirection: 'column',
        //Altura calculada del 100 del viewport height - 100px que es el height del navbar
        height: 'calc(100vh - 100px)',
        alignItems: 'center',
        justifyContent: 'center',
        //The align-self CSS property overrides a grid or flex item's align-items value. In Grid, it aligns the item inside the grid area. In Flexbox, it aligns the item on the cross axis.
        alignSelf: 'center'
      }}>
        <Text h1>No hay favoritos</Text>
        <Image 
          src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg'
          width={250}
          height={250}
          css={{
            opacity: 0.1
          }}
        />
      </Container>
  )
};
