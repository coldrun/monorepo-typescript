import { isCallable } from './check';

export function isPromise<T>(value: unknown): value is Promise<T> {
  return !!(
    value &&
    (typeof value === 'object' || typeof value === 'function') &&
    'then' in value &&
    typeof value.then === 'function' &&
    'catch' in value &&
    typeof value.catch === 'function'
  );
}

interface TaskResult<T> {
  value?: T;
  error?: unknown;
  index: number;
}

type PromiseOrFunction<T> = Promise<T> | (() => Promise<T>);

export function PromiseQueue<T = unknown>(
  tasks: PromiseOrFunction<T>[],
  opts?: { concurrency?: number },
) {
  const queue: Array<{ task: () => Promise<TaskResult<T>> }> = [];

  const add = (task: PromiseOrFunction<T>) => {
    const index = queue.length;
    queue.push({
      async task() {
        try {
          const res = await (isCallable(task) ? task() : task);
          return { value: res, index };
        } catch (error) {
          return { error, index };
        }
      },
    });
  };

  [...(tasks || [])].forEach(add);

  if (!queue.length) {
    return Promise.resolve([]);
  }

  const concurrency = opts?.concurrency || 1;
  let pending = 0;

  return new Promise((resolve: (value: T[]) => void, reject) => {
    const done: (T | unknown)[] = [];
    let failed = false;

    const dequeue = () => {
      if (queue.length === 0 && pending === 0) {
        return failed ? reject(done) : resolve(done as T[]);
      }

      if (pending >= concurrency || !queue.length) {
        return;
      }

      pending++;
      const item = queue.shift();
      item?.task().then((res) => {
        if (res.error) {
          failed = true;
        }
        done[res.index] = res.error || res.value;
        pending--;
        dequeue();
      });

      dequeue();
    };

    dequeue();
  });
}
