import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
@Module({ namespaced: true, name: 'Modal' })
class Modal extends VuexModule {
  public modal: boolean = false;

  @Mutation
  public setModal(newStateModal: boolean): void {
    this.modal = newStateModal
  }
}
export default Modal