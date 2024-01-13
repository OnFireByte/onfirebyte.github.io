---
title: "Gleam: FP น้องใหม่ไฟแรงที่น่าจับตาดู"
tags:
    - gleam
    - functional programming
cover: "./images/gleam.png"
date: 2024-01-13
image_position: object-center
---

ไม่รู้ว่าด้วยเหตุผลอันใดที่ผมได้ไปเจอกับภาษานี้ แต่พอได้มาดู language tour แล้วรู้สึกว่ามันน่าสนใจมาก ๆ เลยอยากเอามาพูดถึงหน่อย (จริง ๆ คือแอบกลัวว่า blog จะมีแต่เรื่องเพลง 5555)

[**Gleam**](https://gleam.run/) เป็นภาษากลุ่ม functional programming ที่ทำงานบน BEAM VM (ที่ใช้รัน Erlang, Elixir) และสามารถ build ออกมาเป็น JS ได้ โดยตอนนี้ก็ใกล้จะได้ release v1.0 แล้ว จึงถือว่าใหม่แกะกล่องพอสมควรเลย

คือจริง ๆ แล้วตอนนี้ก็มีภาษา FP ให้ใช้เยอะแยะ แล้วเจ้าน้องใหม่ตัวนี้มันมีดีอะไร ? ส่วนตัวเลยคือผมรู้สึกว่าเจ้าตัวนี้มันมีไม้เด็ดตรงตัว syntax ของมันกับการที่รันบน BEAM VM นี่แหละ!

## Syntax overview

### It's like simpler rust

ในส่วนของ syntax มันเหนี่ย ถ้าให้พูดง่าย ๆ คือมันได้แรงบรรดาลใจมากจาก rust เยอะมาก ๆ คือถ้าคุณเคยเขียน Rust มา จะมาเขียนภาษานี้คือแทบไม่ต้องเปลี่ยน mindset เยอะเลย หรือต่อให้คุณเป็น TS dev การย้ายมา Gleam ก็ไม่ยากเหมือนกัน เพราะจริง ๆ แล้ว rust ก็คล้าย ๆ กับ TS อยู่แล้ว

```rust
// Rust
pub fn sum(x: u64, y: u64) -> u64 {
  x + y
}

let mul = |x, y| x * y;
mul(1, 2);
```

```rust
// Gleam
pub fn sum(x, y) {
  x + y
}

let mul = fn(x, y) { x * y }
mul(1, 2)
```

หรือแม้แต่ตัว Monad type ที่ใช้กันบ่อย ๆ อย่าง Option, Result ก็มีให้ใช้เหมือนกัน

แต่ส่วนที่ต่างคือตัว Gleam นั้นจะเน้นไปทาง FP สูงกว่า Rust มาก ๆ ทำให้มันมี mutable value หรือ control flow หลาย ๆ ตัวที่แกนหลักของภาษากลุ่ม imperative เกือบทั้งหมดอย่าง `if-else`, `for` นั้นถูกเอาออกหมด แล้วก็หันมาใช้พวก pattern matching, iterator, recursive แทน

อีก feature นึงที่ถือว่าเป็น key หลักของภาษานี้เลยก็คือตัว pipe operator `|>` (`|` ต่อด้วย `>`) ที่ได้อิทธิพลมาจากรุ่นพี่อย่าง Elixir และ F# ซึ่งมันคือการ compose function ออกมาให้อ่านได้ง่ายขึ้นนั่นเอง

```rust
// normal way to chaining function
third_function(second_function(first_function(value)))

// pipe operator
value
|> first_function() // you also can remove the () behind
|> second_function()
|> third_function()
```

ซึ่งถ้า function รับหลาย argument ตัว ถ้าเราไม่ได้ระบุอะไร ตัว pipe มันก็จะฉลาดพอที่จะเอาไปใส่ตำแหน่งแรกให้แทน ทำให้มันก็สามารถใช้แทนการใช้ method ของภาษา OOP ได้พอสมควร

```rust
fn minus(a, b) { a - b }

1 |> minus(2) // -1
```

อีกจุดนึงที่แปลกกว่าภาษาอื่น ๆ คือด้วยความที่มี feature น้อยมาก ทำให้มักจะมีการใช้ท่า callback function อยู่บ่อย ๆ ซึ่งชาว JS ก็น่าจะรู้กันดีถึงความวินาศสันตะโรอย่าง callback hell ทำให้ภาษานี้ก็มี feature ใหม่มาช่วยอย่าง `use`

```rust
// callback hell
pub fn main() {
  logger.record_timing(fn() {
    database.connect(fn(db) {
      file.open("file.txt", fn(f) {
        // Do something with `f` here...
      })
    })
  })
}

// `use` keyword
pub fn main() {
  use <- logger.record_timing
  use db <- database.connect
  use f <- file.open("file.txt")
  // Do something with `f` here...
}
```

ชาว JS อาจจะรู้สึกว่าฟีลมันแอบคล้าย ๆ async-await แหะ แต่ถ้าไปถามชาว haskell น่าจะบอกว่านี่มัน IO action นี่หว่า ซึ่งส่วนตัวรู้สึกว่ามันคือได้ reference มาจาก haskell แล้วปรับ api ใหม่ให้ใช้ได้กว้างขึ้นกว่าเดิมสะมากกว่านะ

### It's Elixir, OCaml but not alien

แล้วเมื่อเอามันไปเทียบกับภาษารุ่นพี่อย่าง Elixir ก็ปรับตัวได้ง่ายกว่าเหมือนกัน แต่จุดแข็งของ Gleam เลยก็คือมันเป็นภาษาแบบ static typed ทำให้ลดปัญหาเรื่อง type ไปได้เยอะมาก ๆ

อีกความเจ๋งคือความสามารถในการ infer type ของมันก็ดีมาก ๆ ซึ่งมันก็ได้อิทธิพลมาจากตัว OCaml โดยหลักการมันก็คือลดการมี function/operator overloading ไปให้มากที่สุด ซึ่งส่วนนึงก็คือการแยก operator ที่ใช้กับ int และ float เป็นคนละตัวด้วยการเติม `.` ไว้ข้างหลัง การทำแบบนี้ทำให้เราแทบไม่ต้องระบุ type เองเลย แต่ตัวภาษาเองก็ยังเป็น static typed ให้เราอยู่

```rust
// Gleam
let some_int = 1 + 2

let some_float = 1. +. 2.
```

## BEAM VM

จริง ๆ แล้ว ผมว่า highlight ของภาษานี้มันใช้ BEAM VM เป็น runtime หลักนี่แหละ เพราะว่า BEAM VM มันขึ้นชื่อเรื่องความสามารถในการเป็น web server มาก ๆ เพราะระบบ concurrency ที่ใช้ actor model ซึ่งมันจะแตกงานออกมาเป็น process แทนที่จะเป็น thread ตรง ๆ ทำให้ lightweight กว่า ซึ่งจะคล้าย ๆ กับ goroutine ของ Go แต่สำหรับฝั่ง BEAM VM มันจะ abtract ขึ้นมาอีกระดับนึง ทำให้ใช้ง่ายกว่าพอสมควร อีกจุดแข็งนึงก็คือ fault-tolerance และ high availability จากการที่ตอนแรกมันถูกออกแบบมาให้ใช้กับระบบ telecom ทำให้มันเป็นหนึ่งใน ideal system สำหรับ web server เลย

![BEAM VM visualize](https://miro.medium.com/v2/resize:fit:1400/0*acC0P3hFGAGywgGz.png)

ถึงแม้ว่า BEAM VM มันจะเฟี้ยวระดับนี้ แต่เพราะว่าภาษาที่ใช้เขียนนั้นมันเป็น Erlang ที่เก่ากึ๊ก หรือแม้แต่ตัวใหม่ ๆ อย่าง Elixir ก็เป็น dynamic type และแอบติดความเป็น `alien` ของ FP มาอยู่บ้าง ทำให้คนไม่ค่อยรู้จักหรือใช้ แต่เพราะการมาของ gleam ที่ภาษามันเข้าใจง่ายสำหรับคนที่เขียน imperative มาก็น่าจะทำให้มันเข้าถึงได้ง่ายขึ้นเยอะ

## It's can compiled to JS

อีกหนึ่ง feature ที่หน้าสนใจคือมันสามารถ compile ออกมาเป็น JS ได้ แต่ส่วนตัวคือค่อนข้างเฉย ๆ เพราะไอแนวคิดแบบนี้มันมีเยอะมาก ๆ ทั้งฝั่ง OOP/imperative อย่าง Dart, Kotlin หรือฝั่ง FP เองอย่าง ELM, ReasonML ซึ่งมันไม่ค่อยมีคนมาใช้จริง ๆ เท่าไหร่ โดยเฉพาะฝั่ง FP จะโดนเรื่อง performance หนักกว่ามากเพราะตัวแนวคิดภาษามันต่างกัน ทำให้ท่าการ optimize มันต่างกันเหมือนกัน (แอบไปส่องดูโค้ดที่ build ตัวพวก enum มันโดนทำเป็น array อะไรแบบนี้)

## It's still not that ready

อย่างที่บอกว่าภาษามันนั้นยังไม่ได้ปล่อย full release เลย ทำให้ไม่น่าใช้ใน production จริง และอีกเรื่องคือ LSP ภาษาก็ยังไม่ดีเท่าภาษา mainstream อย่าง TS ขนาดนั้น (ระบบ import มันไม่มีขึ้น suggestion มาเลยสักตัว แต่ถ้าเรียกใช้แบบ module.xx นี่โอเค) แต่ก็พูดได้เลยว่าถ้าแก้ไขตรงนี้ได้ก็น่าจะเป็นภาษาที่น่าเรียนจริง ๆ
