import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import styles from './screenheader.style'


//iconUrl, dimension, handlePress props from indexJS
const ScreenHeaderBtn = ({iconUrl, dimension, handlePress}) => {
  return (
    <TouchableOpacity style = {styles.btnContainer} onPress={handlePress}>
      <Image source={iconUrl} resizeMode = "cover" style={styles.btnImg(dimension)}/>
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn