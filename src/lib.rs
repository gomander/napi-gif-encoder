#![deny(clippy::all)]

use napi::{Env, JsObject, Result};
use napi_derive::module_exports;

mod encoder;

#[module_exports]
fn init(mut exports: JsObject, env: Env) -> Result<()> {
    let encoder = encoder::create_js_class(&env)?;
    exports.set_named_property("GIFEncoder", encoder)?;
    Ok(())
}
