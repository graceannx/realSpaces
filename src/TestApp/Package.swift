// swift-tools-version:5.5
import PackageDescription

let package = Package(
	name: "TestApp",
	products: [
		.executable(name: "TestApp", targets: ["TestApp"]),
	],
	dependencies: [],
	targets: [
		.executableTarget(name: "TestApp", dependencies: [])
	]
)
