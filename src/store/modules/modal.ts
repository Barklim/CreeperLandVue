import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
@Module({ namespaced: true, name: 'Modal' })

class Modal extends VuexModule {

  public cardItem = {};
  public modal: boolean = false;
  public isInBasket: boolean = false;
  public isInBasketAllItemsRemove: boolean = false;
  public showBasketModalAtonce: boolean = false;

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
  @Mutation
  public setIsInBasketAllItemsRemove(newStateIsInBasketAllItemsRemove: boolean): void {
    this.isInBasketAllItemsRemove = newStateIsInBasketAllItemsRemove
  }
  @Mutation
  public setTrueBasketModal(): void {
    this.showBasketModalAtonce = true;
  }
  @Mutation
  public setFalseBasketModal(): void {
    this.showBasketModalAtonce = false;
  }
}

export default Modal