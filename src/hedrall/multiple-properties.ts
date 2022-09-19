/* プロパティが2つ以上の値オブジェクト */
(() => {
  // classを利用

  type Unit = "円" | "ドル";
  class Price {
    unit: Unit;
    amount: number;

    constructor(props: Price) {
      this.unit = props.unit;
      this.amount = props.amount;
    }
  }

  const yen: Price = new Price({ unit: "円", amount: 100 });
  console.log(yen); // Price { unit: '円', amount: 100 }

  const dollar: Price = new Price({ unit: "ドル", amount: 100 });
  console.log(dollar); // Price { unit: 'ドル', amount: 100 }
})();
(() => {
  /* getter/setterやメソッドを実装する場合は注意が必要 */

  type Unit = "円" | "ドル";
  class Price {
    unit: Unit;
    amount: number;

    // クラスの型にはgetter/setterも含まれるので、
    // changeDollarToYen も引数に渡さなくてはならない
    // get changeDollarToYen(): Price {
    //   return new Price({
    //     unit: "円",
    //     amount: this.amount * 100,
    //   });
    // }

    constructor(props: Price) {
      this.unit = props.unit;
      this.amount = props.amount;
    }
  }
})();
(() => {
  /* getter/setterやメソッドを実装する場合はベースクラスを利用する */

  type Unit = "円" | "ドル";
  abstract class PriceBase {
    unit: Unit;
    amount: number;

    constructor(props: PriceBase) {
      this.unit = props.unit;
      this.amount = props.amount;
    }
  }
  class Price extends PriceBase{
    get changeDollarToYen(): Price {
      return new Price({
        unit: "円",
        amount: this.amount * 100,
      });
    }

    constructor(props: PriceBase) {
      super(props);
    }
  }

  const dollar: Price = new Price({ unit: "ドル", amount: 10 });
  console.log(dollar); // Price { unit: 'ドル', amount: 10 }

  const yen: Price = dollar.changeDollarToYen;
  console.log(yen); // Price { unit: '円', amount: 1000 }
})();
