"useclient"
import React from 'react'
import { Circles } from 'react-loader-spinner'

export default function Loading() {
  return (
    <Circles
  height="25"
  width="50"
  color="#fff"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
  )
}
