.PHONY: toolchain
toolchain:
	./s-node/scripts/init.sh

.PHONY: init
init:
	make toolchain
	git submodule update --init --recursive

.PHONY: build
build:
	cd s-node && cargo build --manifest-path node/Cargo.toml --features runtime-benchmarks,with-ethereum-compatibility --release

.PHONY: check
check:
	SKIP_WASM_BUILD=1 cargo check

.PHONY: check-all
check-all: check-runtime check-benchmarks

.PHONY: watch
watch:
	SKIP_WASM_BUILD=1 cargo watch -c -x build

.PHONY: tests
tests:
	cd ./s-node/launchpad-crowdsales && cargo test --verbose

.PHONY: run
run:
	cd s-node && RUST_BACKTRACE=1 cargo run --manifest-path node/Cargo.toml --features with-ethereum-compatibility  -- --dev --tmp

.PHONY: benchmark
benchmark:
	make benchmark-pallet
	cd s-node && cargo run --release --features=runtime-benchmarks --features=with-ethereum-compatibility -- benchmark --chain=dev --steps=50 --repeat=20 '--pallet=*' '--extrinsic=*' --execution=wasm --wasm-execution=compiled --heap-pages=4096 --template=./templates/runtime-weight-template.hbs --output=./runtime/src/weights/
	
.PHONY: benchmark-pallet
benchmark-pallet:
	cd s-node && cargo run --release --features=runtime-benchmarks --features=with-ethereum-compatibility -- benchmark --chain=dev --steps=50 --repeat=20 '--pallet=launchpad_crowdsales' '--extrinsic=*' --execution=wasm --wasm-execution=compiled --heap-pages=4096 --template=./templates/orml-weight-template.hbs --output=./launchpad-crowdsales/src/weights.rs
	cd s-node && cargo run --release --features=runtime-benchmarks --features=with-ethereum-compatibility -- benchmark --chain=dev --steps=50 --repeat=20 '--pallet=launchpad_crowdsales' '--extrinsic=*' --execution=wasm --wasm-execution=compiled --heap-pages=4096 --template=./templates/orml-weight-template.hbs --output=../pallet/src/weights.rs
