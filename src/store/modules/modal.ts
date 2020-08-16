import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
@Module({ namespaced: true, name: 'Modal' })
class Modal extends VuexModule {
  public modal: boolean = false;
  public cardItem = {};

  @Mutation
  public setModal(newStateModal: boolean): void {
    this.modal = newStateModal
  }
@Mutation
  public setCardItem(newCardItem: boolean): void {
    this.cardItem = newCardItem
  }
}
export default Modal