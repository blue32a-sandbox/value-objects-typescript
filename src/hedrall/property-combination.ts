/* プロパティ間の組み合わせが存在する値オブジェクト */
(() => {
  type FoodCategory = "野菜" | "魚" | "冷凍";
  type Vegetable = "トマト" | "キュウリ";
  type Fish = "鮭";
  type FrozenFood = "アイスクリーム";
  abstract class FoodBase {
    category: FoodCategory;
    name: Vegetable | Fish | FrozenFood;
    appreciationPeriod?: Date;

    constructor(props: FoodBase) {
      this.category = props.category;
      this.name = props.name;
      this.appreciationPeriod = props.appreciationPeriod;
    }
  }
  class Food extends FoodBase {
    constructor(props: FoodBase) {
      super(props);
      if (!this.validate(props)) {
        throw new Error('値が不正です。');
      }
    }

    validate(props: FoodBase): boolean {
      switch(props.category) {
        case "野菜":
          return ["トマト", "キュウリ"].includes(props.name) && props.appreciationPeriod !== undefined;
        case '魚':
          return props.name === '鮭' && props.appreciationPeriod !== undefined;
        case '冷凍':
          return props.name === 'アイスクリーム' && props.appreciationPeriod === undefined;
      }
    }
  }

  const tomato: Food = new Food({
    category: "野菜",
    name: "トマト",
    appreciationPeriod: new Date("2022-10-20")
  });

  if (tomato.category === '野菜') {
    const now = new Date();

    // クラスのプロパティ間では型の絞り込みが効かない
    // Object is possibly 'undefined'.
    // if (tomato.appreciationPeriod > now) {}
  }
})();

namespace Food {
  export type Vegetable = {
    category: "野菜";
    name: "トマト" | "キュウリ";
    appreciationPeriod: Date;
  }
  export type Fish = {
    category: "魚";
    name: "鮭";
    appreciationPeriod: Date;
  }
  export type Frozen = {
    category: "冷凍";
    name: "アイスクリーム";
  }
}

(() => {
  /* コンパニオンオブジェクトとnamespaceの組み合わせ */

  type Food = Food.Vegetable | Food.Fish | Food.Frozen;
  const Food = {
    validate(props: Food): boolean {
      switch(props.category) {
        case "野菜":
          return ["トマト", "キュウリ"].includes(props.name);
        case '魚':
          return props.name === '鮭';
        case '冷凍':
          return props.name === 'アイスクリーム';
      }
    },
    carete(props: Food): Food {
      if (!Food.validate(props)) throw new Error('値が不正です。');
      return props as Food;
    }
  }
  const tomato: Food = Food.carete({
    category: "野菜",
    name: "トマト",
    appreciationPeriod: new Date("2022-10-20"),
  });
  const iceCream: Food = Food.carete({
    category: "冷凍",
    name: "アイスクリーム",
  });

  if (tomato.category === '野菜') {
    const now = new Date();

    if (tomato.appreciationPeriod > now) {
      console.log("OK");
    }
  }
})();
