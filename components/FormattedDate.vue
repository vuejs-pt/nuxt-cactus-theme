<script setup lang="ts">
import { getFormattedDate } from "../utils/date";

const props = defineProps<{
	date: Date;
	dateTimeOptions?: Intl.DateTimeFormatOptions;
}>();

const { siteConfig } = useAppConfig();
const postDate = computed(() => getFormattedDate(props.date, props.dateTimeOptions, siteConfig.date));
const iso = computed(() => props.date.toISOString());
</script>

<template>
	<time :datetime="iso" :title="iso" v-bind="$attrs">{{ postDate }}</time>
</template>
