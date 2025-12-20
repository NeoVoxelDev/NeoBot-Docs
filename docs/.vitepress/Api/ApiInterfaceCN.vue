<template>
  <div class="api-interface">
    <div class="interface-header" @click="toggleExpanded">
      <div class="interface-title">
        <h3>{{ interfaceName }}</h3>
        <div class="interface-type" :class="typeClass">{{ interfaceType }}</div>
      </div>
      <div class="expand-icon" :class="{ expanded: isExpanded }">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <transition name="expand">
      <div class="interface-content" v-if="isExpanded">
        <div class="interface-description" v-if="description">
          <p>{{ description }}</p>
        </div>

        <div class="interface-params" v-if="parameters && parameters.length > 0">
          <h4>参数</h4>
          <div class="param-list">
            <div class="param-item" v-for="(param, index) in parameters" :key="index">
              <span class="param-name">{{ param.name }}</span>
              <span class="param-type">{{ param.type }}</span>
              <span class="param-badge" :class="{ required: param.required }">
                {{ param.required ? '必需' : '可选' }}
              </span>
              <span class="param-description" v-if="param.description">{{ param.description }}</span>
            </div>
          </div>
        </div>

        <div class="interface-returns" v-if="returns">
          <h4>返回值</h4>
          <div class="return-item">
            <div class="return-type">{{ returns.type }}</div>
            <div class="return-description" v-if="returns.description">{{ returns.description }}</div>
          </div>
        </div>

        <div class="interface-example" v-if="example">
          <h4>示例</h4>
          <div class="example-description" v-if="exampleDescription">
            {{ exampleDescription }}
          </div>
          <div class="code-block">
            <pre><code>{{ formattedExample }}</code></pre>
            <button class="copy-button" @click="copyToClipboard(example)">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              复制
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Parameter {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
}

interface Returns {
  type: string;
  description?: string;
}

interface Props {
  interfaceName: string;
  interfaceType: 'function' | 'method' | 'property' | 'class' | 'interface';
  description?: string;
  parameters?: Parameter[];
  returns?: Returns;
  example?: string;
  exampleDescription?: string;
  initiallyExpanded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  initiallyExpanded: false
});

const isExpanded = ref(props.initiallyExpanded);

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};

const typeClass = computed(() => {
  switch (props.interfaceType) {
    case 'function':
      return 'type-function';
    case 'method':
      return 'type-method';
    case 'property':
      return 'type-property';
    case 'class':
      return 'type-class';
    case 'interface':
      return 'type-interface';
    default:
      return '';
  }
});

const formattedExample = computed(() => {
  if (!props.example) return '';
  // 将 \n 转换为实际的换行符
  return props.example.replace(/\\n/g, '\n');
});

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // 这里可以添加一个提示消息，表示复制成功
  } catch (err) {
    console.error('复制失败:', err);
  }
};
</script>

<style scoped>
.api-interface {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  background-color: rgba(var(--vp-c-bg-rgb), 0.8);
}

.api-interface:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.interface-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(var(--vp-c-bg-soft-rgb), 0.6);
  backdrop-filter: blur(6px);
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(var(--vp-c-border-rgb), 0.5);
}

.interface-header:hover {
  background: rgba(var(--vp-c-bg-soft-rgb), 0.8);
}

.interface-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.interface-title h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.interface-type {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  color: white;
  letter-spacing: 0.3px;
}

.type-function {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.type-method {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
}

.type-property {
  background: linear-gradient(135deg, #10b981 0%, #16a34a 100%);
}

.type-class {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.type-interface {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.expand-icon {
  transition: transform 0.3s ease;
  color: var(--vp-c-text-2);
  opacity: 0.8;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.interface-content {
  padding: 14px 16px;
  background: rgba(var(--vp-c-bg-rgb), 0.6);
  backdrop-filter: blur(4px);
}

.interface-description {
  margin-bottom: 14px;
  padding: 8px 12px;
  background: rgba(var(--vp-c-bg-soft-rgb), 0.4);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.interface-description p {
  margin: 0;
  color: var(--vp-c-text-1);
  line-height: 1.5;
  font-size: 14px;
}

.interface-params,
.interface-returns,
.interface-example {
  margin-bottom: 14px;
}

.interface-params h4,
.interface-returns h4,
.interface-example h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
}

.interface-params h4::before,
.interface-returns h4::before,
.interface-example h4::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 14px;
  background: var(--vp-c-brand);
  margin-right: 6px;
  border-radius: 2px;
}

.param-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.param-item {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 10px;
  background: rgba(var(--vp-c-bg-soft-rgb), 0.5);
  border-radius: 6px;
  border: 1px solid rgba(var(--vp-c-border-rgb), 0.3);
  transition: all 0.2s ease;
  font-size: 13px;
}

.param-item:hover {
  background: rgba(var(--vp-c-bg-soft-rgb), 0.7);
  transform: translateX(2px);
}

.param-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  min-width: 80px;
  word-break: break-word;
  overflow-wrap: break-word;
}

.param-type {
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  word-break: break-word;
  overflow-wrap: break-word;
  flex: 1;
  min-width: 0;
}

.param-badge {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
}

.param-badge.required {
  background: rgba(var(--vp-c-danger-rgb), 0.1);
  color: var(--vp-c-danger);
}

.param-badge:not(.required) {
  background: rgba(var(--vp-c-success-rgb), 0.1);
  color: var(--vp-c-success);
}

.param-description {
  color: var(--vp-c-text-2);
  font-size: 12px;
  flex: 1;
}

.return-item {
  padding: 8px 10px;
  background: rgba(var(--vp-c-bg-soft-rgb), 0.5);
  border-radius: 6px;
  border: 1px solid rgba(var(--vp-c-border-rgb), 0.3);
}

.return-type {
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  padding: 4px 8px;
  border-radius: 3px;
  margin-bottom: 6px;
  display: inline-block;
}

.return-description {
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.4;
}

.example-description {
  margin-bottom: 8px;
  padding: 6px 10px;
  background: rgba(var(--vp-c-brand-rgb), 0.08);
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.4;
  border-left: 3px solid var(--vp-c-brand);
}

.code-block {
  position: relative;
  background: rgba(var(--vp-c-bg-soft-rgb), 0.5);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(var(--vp-c-border-rgb), 0.3);
}

.code-block pre {
  margin: 0;
  padding: 12px 14px 12px 14px;
  padding-right: 50px;
  overflow-x: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
  word-wrap: break-word;
}

.copy-button {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(var(--vp-c-bg-rgb), 0.9);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(var(--vp-c-border-rgb), 0.6);
  border-radius: 4px;
  font-size: 11px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.copy-button:hover {
  background: rgba(var(--vp-c-bg-rgb), 0.9);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: translateY(-1px);
}

/* 展开动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .param-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .param-name {
    min-width: auto;
  }
}
</style>