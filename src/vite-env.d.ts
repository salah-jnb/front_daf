/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL?: string;
	readonly VITE_SITE_NAME?: string;
	readonly VITE_SITE_URL?: string;
	readonly VITE_OG_IMAGE?: string;
	readonly VITE_GA_MEASUREMENT_ID?: string;
	readonly VITE_GSC_VERIFICATION?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
