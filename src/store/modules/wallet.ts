import { createSlice } from '@reduxjs/toolkit'

export interface WalletParams {
  name: string;
}

const initialState: WalletParams = {
  name: 'wallet'
}

export const WalletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    getName: (state) => {
      let { name } = state
      console.log(name)
    }
  }
})

// import actions
export const { getName } = WalletSlice.actions

export default WalletSlice.reducer