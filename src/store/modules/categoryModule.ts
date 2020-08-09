import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
@Module({ namespaced: true, name: 'CategoryModule' })
class CategoryModule extends VuexModule {
  public categoryName: string = '';
  public categoryId: number = 0;
  @Mutation
  public setName(newName: string): void {
    this.categoryName = newName
  }
  @Mutation
  public setId(newId: number): void {
    this.categoryId = newId
  }
  @Action
  public updateName(newName: string): void {
    this.context.commit('setName', newName)
  }
}
export default CategoryModule