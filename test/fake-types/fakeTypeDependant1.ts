import { FakeTypeDependant2 } from './fakeTypeDependant2'

export class FakeTypeDependant1 {

  props: number

  constructor (fakeTypeDependant2: FakeTypeDependant2) { this.props = 1 }
}
