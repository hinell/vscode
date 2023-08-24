find_package(Cygwin REQUIRED)
find_package(SDL REQUIRED)
find_package(Doxygen REQUIRED)
# NOTE: Lack chekcing for compiler features and present headers!

Package(
	CMAKE_VERSION
		3.16.3...4.0 FATAL
	NAME
		"Package name"		# Package name for the export
	VERSION
		"1.2.0"				# Semver
							# Exported targets
	BINARY_NAME				# Export binary
		"executable-name"

	BINARY_PROPERTIES		# set_target_properties(...)
			WIN32_EXECUTABLE
			ENABLE_EXPORTS

	BINARY_SOURCES
			...

	BINARY_INSTALL_PATH
			"CMAKE_BINARY_DIR/PACKAGE_NAME-PACKAGE_VERSION_MAJOR"

	LIBRARY					# Export library
		"library-name"

	LIBRARY_INSTALL_PATH
		"CMAKE_LIBRARY_DIR/PACKAGE_NAME-PACKAGE_VERSION_MAJOR"

	LIBRARY_TYPE
		"shared"

	LIBRARY_SOURCES
		"./lib/main.cxx"

	LIBRARY_SOURCES
			"./win32/platform.h"
			"./win32/platform.cxx"
			...

	INTERFACE               # Export interface
		"executable-name"

	INTERFACE_SOURCES
		...

	DEPENDENCIES_PUBLIC     # Like PUBLIC
		Doxygen::doxygen

	DEPENDENCIES_INTERFACE  # Like INTEFACE

	DEPENDENCIES_PRIVATE    # Like ...

	DEPENDENCIES_DEV        # Internal package deps (e.g. for testing)
							# that are not used for packaing

	CPACK_PACKAGE_DESCRIPTION_SUMMARY ...
	CPACK_PACKAGE_VENDOR ...
	CPACK_PACKAGE_ICON ...
)