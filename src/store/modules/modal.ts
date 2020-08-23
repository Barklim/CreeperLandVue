import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
@Module({ namespaced: true, name: 'Modal' })

class Modal extends VuexModule {

  public cardItem = {};
  public modal: boolean = false;
  public isInBasket: boolean = false;

  @Mutation
  public setCardItem(newCardItem: boolean): void {
    this.cardItem = newCardItem
  }
  @Mutation
  public setModal(newStateModal: boolean): void {
    this.modal = newStateModal
  }
  @Mutation
  public setIsInBasket(newStateModal: boolean): void {
    this.isInBasket = newStateModal
  }
}

export default Modal