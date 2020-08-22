import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import { Prop } from 'vue-property-decorator';
import { CartItem } from "../../types";

@Module({ namespaced: true, name: 'test' })
class Cart extends VuexModule {

  cartItem?: CartItem;

	public cartArr: any = [];
	//public cartArr: Array<any> = [];

  // public id: number = 0;
  // public cost: number = 0;
  // public quantityCount: number = 0;
  // public categoryName: string = ''
  // public image : string = ''
  // public name: string = ''

  // Setter
  @Mutation
  public setCartArr(newCartItem: CartItem): void {
    this.cartArr.push(newCartItem)
  }
  // Getter
  @Mutation
  public getById(getterId: number) {
  	// dont work :(
    // this.cartArr = this.cartArr.push(newCartItem);
    // return state.articles.find(item => item.id === parseInt(id));
    return 2;
  }
  // Getter function dont work :(
  // get getById1(getterId: number) {
  //   // this.cartArr = this.cartArr.push(newCartItem);
  //   return 2;
  // }
}

export default Cart