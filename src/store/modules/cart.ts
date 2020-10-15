import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import { Prop } from 'vue-property-decorator';
import { CartItem } from "../../types";

@Module({ namespaced: true, name: 'test' })
class Cart extends VuexModule {

  cartItem?: CartItem;

	public cartArr: any = [];
	//public cartArr: Array<any> = [];
	public isOpen: boolean = false;

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
  @Mutation
  public getCountItem(id: number) {
    const countItem = this.cartArr.find(item => item.id === id);

    // console.log('!!! !')
    // console.log(id)
    // console.log(countItem)
    // console.log(countItem.qtty)

    // Dont work!

    return countItem.qtty;
  }
  // Getter function dont work :(
  // get getById1(getterId: number) {
  //   // this.cartArr = this.cartArr.push(newCartItem);
  //   return 2;
  // }
  @Mutation
  public delById(id: number) {
    // this.cartArr.forEach((item, index, array) => {
    //   console.log(`${item.id} имеет позицию ${index} в ${array}`);
    //   console.log('!!! test');
    //   console.log(delById);
    // });

    const filtredArray = this.cartArr.filter(item => item.id !== id);

    this.cartArr = filtredArray; 
  }
  @Mutation
  public addCountItem(id: number) {
    const addCountItem = this.cartArr.find(item => item.id === id);
    ++addCountItem.qtty;
  }
  @Mutation
  public subCountItem(id: number) {
    const addCountItem = this.cartArr.find(item => item.id === id);
    --addCountItem.qtty;
  }
}

export default Cart