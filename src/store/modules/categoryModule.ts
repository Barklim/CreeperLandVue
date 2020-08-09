import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
@Module({ namespaced: true, name: 'CategoryModule' })
class CategoryModule extends VuexModule {
  public categoryName: string = ''
  @Mutation
  public setName(newName: string): void {
    this.categoryName = newName
  }
  @Action
  public updateName(newName: string): void {
    this.context.commit('setName', newName)
  }
}
export default CategoryModule