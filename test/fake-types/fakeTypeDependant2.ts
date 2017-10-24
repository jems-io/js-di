import { FakeTypeDependant1 } from './fakeTypeDependant1'

export class FakeTypeDependant2 {

  props: number

  constructor (fakeTypeDependant1: FakeTypeDependant1) { this.props = 1 }
}
