import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
@Module({ namespaced: true, name: 'test' })
class Cart extends VuexModule {

	public cartArr: Array<any> = [];
	// item for cart need interface
  public id: number = 0;
  public cost: number = 0;
  public categoryName: string = ''
  public image : string = ''
  public name: string = ''

  // getters, setter

  @Mutation
  public setName(newName: string): void {
    this.name = newName
  }
}

export default Cart