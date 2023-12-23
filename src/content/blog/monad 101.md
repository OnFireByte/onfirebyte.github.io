---
title: "Monad มันเป็นแค่ pattern"
tags:
    - monad
    - functional programming
cover: "./images/monad.png"
date: 2023-12-23
image_position: object-center
---

คำแนะนำ: บทความนี้จะใช้ code typescript อธิบายเป็นส่วนใหญ่ ใครไม่เคยเขียน FP จ๋า ๆ ก็อ่านได้

หลาย ๆ คน อาจจะเคยได้ยินกับ paradigm ตัวนึงซึ่งถือว่าได้รับความสนใจมาก ๆ อย่าง "Functional Programming" ที่ใช้หลักการ Immutable, Higher-order Function, Function Composition มีเขียนโค้ด high level ซึ่งถ้าคุณสนใจในตัว FP คุณก็คงลองศึกษาลงมาเรื่อย ๆ จนไปเจอกับสิ่งนึงที่คนในวงการนี้เขาพูดถึงบ่อยมาก ๆ แล้วเขาก็ชอบล้อว่ามันเป็นไอเดียที่ไม่มีใครเข้าใจมัน (แล้วถ้าคุณบอกว่าคุณเก็ต ส่วนใหญ่คือยังไม่เก็ต 555) ซึ่งไอเดียนั้นก็คือ **Monad**

## What the hell is Monad

คุณอาจจะเคยเห็นมุกหรือ meme ที่คนเขาชอบพูดกันว่า **"A monad is a monoid in the category of endofunctors, what's the problem?"** ที่อธิบาย Monad แบบง่าย ๆ แต่กลายเป็นว่ามันดูงงกว่าเดิมไปอีก อะไรคือ monoid, category, endofunctors? ซึ่งถ้าคุณไม่เคยอ่าน Category Theory มาก่อนคุณคงไม่รู้จักสักกะคำที่ว่ามา ซึ่งในบทความนี้ผมเลือกที่จะอธิบาย Monad โดยไม่ยุ่งกับ Category Theory หรือคำศัพท์ที่มาทั้งหมดเลยนอกจากตัว Monad ซึ่งผมจะอธิบายในมุมมองของ programmer นะ

## (Easy) Definition of Monad in functional programming

ในโลกของ FP มันจะมี concept ของ **Wrapper** ที่เป็น type ที่มันหุ้ม (wrap) ค่าใด ๆ นึงอีกที

ถ้าพูดแบบเห็นภาพก็คือมันเป็นกล่องที่เอาไว้ใส่ของ**ประเภทนึง** ซึ่งเราสามารถเขียน Wrapper เป็น type ได้เป็นหน้าตาแบบนี้

```ts
Wrapper<T>; // A เป็น type อะไรก็ได้
```

ตัวอย่างของ Wrapper ในโลก JS/TS ที่เห็นได้ชัดก็คือ `Array<T>` และ `Promise<T>` ซึ่งเก็บค่า `T` เอาไว้ในตัว แค่ต่างกันที่ array เก็บ type เดียวกันได้หลายค่า ส่วน promise มันเก็บค่าเดียว

จะเห็นได้ว่าทั้ง ๆ ที่ array กับ promise เป็น wrapper เหมือนกัน แต่หน้าที่และความสามารถมันต่างกันโดยสิ้นเชิง จึงพูดได้ว่า Wrapper มันเป็น concept ที่กว้างและ generic มาก ๆ ซึ่งตัว Monad มันก็เหมือนกัน

โดยหัวใจหลักของ Monad เหนี่ยมันพูดถึงกลุ่มของ Wrapper จำนวนนึง ที่มี method/function/operation 2 ตัว ซึ่งก็คือ `unit` กับ `bind` ถ้า Wrapper ไหนมี function นี้ก็ถือว่าเป็น Monad แล้ว

### 1. Unit

นิยามของ unit จริง ๆ แล้วมันง่ายมาก ซึ่งก็คือ function ที่รับค่ามา แล้วหุ้มมันด้วย Wrapper ดังกล่าว (Wrapper ส่วนใหญ่ทำได้อยู่แล้ว จึงไม่ได้เป็นจุดสำคัญ)

```ts
// M<_> คือ Monad นะ
type unit = (v: T) => M<T>;
```

ปล. บางภาษา (Haskell) จะเรียกว่า return แต่ป้องกันการสับสนกับ keyword return ใน JS/TS ก็เลยเรียก unit แทน

### 2. Bind

จริง ๆ แล้ว ที่ว่ามาทั้งหมดเหนี่ย หัวใจหลักของ Monad มันก็คือ `bind` นี่แหละ ดังนั้นแนะนำว่าให้ทำความเข้าใจส่วนนี้เยอะ ๆ

นิยามของ Bind มันแอบ abstract นิดหน่อย ถ้าให้พูดง่าย ๆ มันคล้าย ๆ กับ method map ของ array ใน JS ที่แปลงค่าในตัว array เป็นอีกค่าตาม function ที่รับมา

```ts
type map<U> = (a: Array<T>, f: (t: T) => U) => Array<U>;
```

> fun fact: ถ้า Wrapper ไหนมี function map แบบนี้ จะถือว่าเป็น Functor (ใช่แล้ว, functor ใน endofunctor คือไอนี่แหละ)

bind ก็คล้ายกันเลย ต่างกันแค่ว่าแทนที่ function f มันจะคืน `U` มา เราก็คืน `M<U>` มาแทน

```ts
type bind<U> = (a: M<T>, f: (t: T) => M<U>) => M<T>;
```

หรือมองอีกมุมนึง ด้วยความที่ f เป็น `(t:T) => M<U>)` ปกติแล้วถ้าเราจะใช้ map ผลลัพธ์ที่ได้ออกมาจะเป็น `M<M<U>>` แต่ bind เราเลือกที่จะลดความซ้ำซ้อนตรงนี้ เราเลยทำการ _flatten_ มันให้เหลือแค่ `M<U>` พอ ทำให้ function bind มีอีกชื่อนึงคือ **_flatMap_** (เริ่มคุ้น ๆ แล้วใช่ปะ)

ดังนั้น ถ้า Wrapper ใหนมี function 2 ตัวนี้ มันก็จะนับว่าเป็น Monad โดยอัตโนมัติ

## Example of Monad's usage

จะเห็นได้เลยว่านิยามมันก็กว้างมาก จึงเป็นเหตุผลที่ผมจะบอกว่า **_Monad มันเป็นแค่ design pattern แบบนึง ซึ่ง pattern นี้มันใช้แก้ปัญหาหรือมี use case ที่แตกต่างกันอย่างสิ้นเชิง_** เพื่อที่จะอธิบายส่วนนี้ ผมก็จะยก use case ที่เห็นได้บ่อย ๆ มาสองตัว ก็คือ Array กับ Maybe

### 1. Array and flatMap

อย่างที่แอบสปอยล์ไปข้างต้นว่า bind มีอีกชื่ือนึงก็คือ flatMap ซึ่งมันก็คือ flatMap เดียวกันกับใน array ของ JS นั่นแหละ ดังนั้นก็หมายความว่า array ก็เป็น monad ตัวนึง (และน่าจะเป็นตัวเดียว) ใน JS

โดยหน้าที่ของ bind/flatMap ใน array ก็คือการ flatten array ที่ได้มาจาก mapping function ให้กลายเป็น array ตัวเดียว

```ts
const a = [1, 2, 3];
const res = a.flatMap((x) => [x, x * x]);
console.log(res); // [ 1, 1, 2, 4, 3, 9 ]
```

ในส่วนของ array ผมอาจจะไม่ได้พูดถึงมาก เพราะหลาย ๆ คนน่าจะเคยใช้กันอยู่แล้ว แค่อาจจะบอกว่าไอที่เรา ใช้ ๆ กันอยู่เหนี่ยมันก็คือ Monad นั่นแหละ

### 2. Maybe and nothingness

`Maybe<T>` (หรือบางทีก็เรียก `Option<T>`) เป็นแนวคิดนึงที่ programmer ส่วนใหญ่อาจจะไม่เคยได้ยินเท่าไหร่ โดย concept มันก็คือการใช้ Wrapper มาเพื่อบอกว่าค่าที่ได้มาอาจจะเป็น _"null"_ ได้

หลาย ๆ คนน่าจะเคยประสบพบเจอกับ bug ที่เกิดจากการที่ value ที่ได้มามันดันเป็น null โดยไม่รู้ตัวใช่ไหม? ไอปัญหานี้จริง ๆ แล้วมันใหญ่มาก ๆ จนคนสร้างภาษา ALGOL W ที่เป็นต้นน้ำของการใช้ null ถึงกับบอกเองว่า null เป็น **_"The Billion Dollar Mistake"_** เพราะไอบัค null reference นี่มันทำให้บริษัทหลาย ๆ ที่เสียหายรวมกันเป็นพันล้านได้ (ซึ่งตอนนี้ก็น่าจะเกินแล้ว 5555)

โอเค ในเมื่อ null มันไม่ดี แต่เราก็อยากที่ของสักอย่างที่เป็นตัวแทนของความไม่มี (nothingness) ทำให้มันมีคนคิดหลายไอเดียมาก ๆ ซึ่งไอเดียนึงที่ใช้กันเยอะในภาษา FP ก็คือ Maybe

ถ้าให้พูดง่าย ๆ Maybe มันเป็น Wrapper ที่เก็บค่าพร้อมกับ state เอาไว้ โดย state จะเป็นตัวบอกว่าจริง ๆ แล้วมันมีค่าจริง ๆ หรือเป็น Nothing (null) กันแน่

```ts
class Maybe<T> {
    value: T | null;
    valid: boolean;

    private constructor(value: T | null, valid: boolean) {
        this.value = value;
        this.valid = valid;
    }

    static unit<T>(value: T): Maybe<T> {
        return new Maybe(value, true);
    }

    static nothing<T>(): Maybe<T> {
        return new Maybe<T>(null, false);
    }

    bind<U>(f: (v: T) => Maybe<U>): Maybe<U> {
        if (this.valid) {
            return f(this.value!);
        } else {
            return Maybe.nothing();
        }
    }

    ...
}
```

ใน code ตัวนี้อาจจะไม่เห็นชัดเจนว่ามันดีกว่าการใช้ null ยังไง อันนี้แนะนำว่าลองไปอ่าน `Option<T>` ของ rust ดู สั้น ๆ ก็คือหัวใจหลักในภาษาที่ใช้ maybe คือมันจะมี mechanism ที่คอยบังคับให้เราต้องเช็คตลอดว่าของใน Maybe มันมีของอยู่จริง ๆ ไหม ต่างจากภาษาที่ใช้ null ที่ไม่ค่อยมี indicator มาบังคับ

ต่อมา usecase ของ bind ที่นี้คือ **_ถ้าตัวมันเป็น null มันจะไม่รัน function f เลย แล้วคืน nothing มาแทน_** ซึ่ง mechanism แบบนี้ทำให้เราสามารถเรียก function เป็นทอด ๆ ยาว ๆ ได้โดยไม่ต้องมานั่งเช็คระหว่างทางว่าเป็น null ไหม

#### Normal flow:

```ts
const a1 = f1(1);
if (a1 === null) {
    console.log("It's null!");
    return null;
}

const a2 = f2(a1);
if (a2 === null) {
    console.log("It's null!");
    return null;
}

const a3 = f3(a2);
if (a3 === null) {
    console.log("It's null!");
    return null;
}

return a3;
```

#### Maybe monad flow:

```ts
const a = Maybe.unit(1).bind(f1).bind(f2).bind(f3);

if (a.valid) {
    return a.value;
} else {
    console.log("It's null!");
    return Maybe.empty();
}
```

จะเห็นได้เลยว่า code แบบ ที่ใช้ maybe มันสั้นกว่ามาก ๆ จึงเป็นเหตุผลที่ Maybe มักจะทำเป็น monad

จากตัวอย่างทั้งสองตัว จะเห็นได้ว่า array และ maybe นั้นการใช้งานต่างกันสิ้นเชิง รวมไปถึง application ของ function bind ก็มีหน้าที่ที่ต่างกันมาก ๆ จึงเป็นเหตุผลที่ผมบอกว่า monad มันเป็น แค่ design pattern ซึ่งจริง ๆ แล้วก็เป็นข้อดีที่เราสามารถเอา pattern monad ไปใช้ที่อื่นได้เยอะ ๆ มาก ๆ เช่นกัน

ก็หวังว่าบทความนี้จะทำให้คนที่สนใจใน FP เข้าใจใน monad ได้สักที :)

## Additional read (external):

อย่างที่บอกว่า monad มี use case เยอะ ก็เลยอยากจะเพิ่มตัวอย่างนิดหน่อย

1. `Result<T>`: ในเมื่อเราทำ null ให้เป็น wrapper ได้ เราก็ทำให้ function มันคืน error ออกมาถ้ามีปัญหาแทนที่จะ throw แทนได้

<iframe width="560" height="315" src="https://www.youtube.com/embed/wM6o70NAWUI?si=hKI6lxjUJkFx-ucw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

2. `Haskell IO`: ในเมื่อ Pure FP แบบ Haskell ไม่ยอมให้เกิด Side Effect ใน Logic แล้วถ้าเราอยากจะ mutate ของในโลกจริง ๆ แบบ terminal หรือ DB จะทำยังไงหล่ะ ก็สร้างโลกใบใหม่ + monad ไง (warning: ควรอ่านการเขียน type ใน haskell ได้เป็นอย่างน้อย แต่ถือว่าเปิดโลก FP เลย)

<iframe width="560" height="315" src="https://www.youtube.com/embed/fCoQb-zqYDI?si=vM5hkP-C7pvYbPIT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

3. Monad Tranformer: ถ้าเรามี monad หลาย ๆ ตัวมาใช้ด้วยกันแบบ `Array<Maybe<T>>` จะทำยังไงให้มันสวย ๆ นะ (warning: Scala ภาษาอ่านง่าย แต่ concept นี้ค่อนข้างยากยาก)
 <iframe width="560" height="315" src="https://www.youtube.com/embed/KJIvIUV3sqY?si=_WMaM3I8Ec3CRDg5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
