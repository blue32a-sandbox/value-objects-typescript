/* プロパティが1つの値オブジェクト */
import { Opaque } from 'type-fest';

(() => {
  /* classを利用 */

  class EmailAddress {
    value: string;
    constructor(value: string) { this.value = value; }

    // JSON.stringifyのためにtoJSONメソッドが必要
    toJSON() {
      return this.value;
    }
  }
  const emailAddress = new EmailAddress('test@test.com');
  console.log(JSON.stringify(emailAddress));

  // 値の取り出しは毎回 .value が必要
  console.log(emailAddress.value);
})();
(() => {
  /* コンパニオンオブジェクトを利用 */

  type CellPhoneNumber = `${number}-${number}-${number}`;
  const CellPhoneNumber = {
    create: (value: string): CellPhoneNumber => {
      if (!/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(value)) {
        throw new Error("携帯電話番号の形式が正しくありません。");
      }
      return value as CellPhoneNumber;
    }
  }

  const num1: CellPhoneNumber = CellPhoneNumber.create("000-0000-0000");
  const num2: string = num1; // OK
  console.log(JSON.stringify(num1)); // "000-0000-0000"

  // 不正な代入が可能
  const num: CellPhoneNumber = "080-0000000000000-111111111111";
})();
(() => {
  /* Opaque型を利用 */

  type CellPhoneNumber = Opaque<`${number}-${number}-${number}`, "CellPhoneNumber">;
  const CellPhoneNumber = {
    create: (value: string): CellPhoneNumber => {
      if (!/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(value)) {
        throw new Error("携帯電話番号の形式が正しくありません。");
      }
      return value as CellPhoneNumber;
    }
  }

  // Type '"080-0000000000000-111111111111"' is not assignable to
  // type 'Opaque<`${number}-${number}-${number}`, "CellPhoneNumber">'.
  // Type 'string' is not assignable to type 'Tagged<"CellPhoneNumber">'.
  // const num1: CellPhoneNumber = "080-0000000000000-111111111111";

  const num2: CellPhoneNumber = CellPhoneNumber.create("080-0000-0000");
  console.log(num2); // 080-0000-0000

  const num3: string = num2;
  console.log(num3); // 080-0000-0000
})();
