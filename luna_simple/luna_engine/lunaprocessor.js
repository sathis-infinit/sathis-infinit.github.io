//<script src="node_modules/@picovoice/web-voice-processor/dist/iife/index.js"></script>
var WebVoiceProcessor = (function (exports) {
  'use strict';

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function createCommonjsModule(fn) {
    var module = { exports: {} };
    return fn(module, module.exports), module.exports;
  }

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime_1 = createCommonjsModule(function (module) {
    var runtime = (function (exports) {

      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.
      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

      function define(obj, key, value) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
        return obj[key];
      }
      try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
      } catch (err) {
        define = function (obj, key, value) {
          return obj[key] = value;
        };
      }

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);

        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        generator._invoke = makeInvokeMethod(innerFn, self, context);

        return generator;
      }
      exports.wrap = wrap;

      // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.
      function tryCatch(fn, obj, arg) {
        try {
          return { type: "normal", arg: fn.call(obj, arg) };
        } catch (err) {
          return { type: "throw", arg: err };
        }
      }

      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed";

      // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.
      var ContinueSentinel = {};

      // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.
      function Generator() { }
      function GeneratorFunction() { }
      function GeneratorFunctionPrototype() { }

      // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.
      var IteratorPrototype = {};
      IteratorPrototype[iteratorSymbol] = function () {
        return this;
      };

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = GeneratorFunctionPrototype.prototype =
        Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunction.displayName = define(
        GeneratorFunctionPrototype,
        toStringTagSymbol,
        "GeneratorFunction"
      );

      // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.
      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          define(prototype, method, function (arg) {
            return this._invoke(method, arg);
          });
        });
      }

      exports.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor
          ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
          : false;
      };

      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
      };

      // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.
      exports.awrap = function (arg) {
        return { __await: arg };
      };

      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;
            if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
              return PromiseImpl.resolve(value.__await).then(function (value) {
                invoke("next", value, resolve, reject);
              }, function (err) {
                invoke("throw", err, resolve, reject);
              });
            }

            return PromiseImpl.resolve(value).then(function (unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration.
              result.value = unwrapped;
              resolve(result);
            }, function (error) {
              // If a rejected Promise was yielded, throw the rejection back
              // into the async generator function so it can be handled there.
              return invoke("throw", error, resolve, reject);
            });
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return previousPromise =
            // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(
              callInvokeWithMethodAndArg,
              // Avoid propagating failures to Promises returned by later
              // invocations of the iterator.
              callInvokeWithMethodAndArg
            ) : callInvokeWithMethodAndArg();
        }

        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);
      AsyncIterator.prototype[asyncIteratorSymbol] = function () {
        return this;
      };
      exports.AsyncIterator = AsyncIterator;

      // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.
      exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;

        var iter = new AsyncIterator(
          wrap(innerFn, outerFn, self, tryLocsList),
          PromiseImpl
        );

        return exports.isGeneratorFunction(outerFn)
          ? iter // If outerFn is a generator, return the full iterator.
          : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
          });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;

        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            }

            // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;

            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);

            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;

            var record = tryCatch(innerFn, self, context);
            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done
                ? GenStateCompleted
                : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };

            } else if (record.type === "throw") {
              state = GenStateCompleted;
              // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.
              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      }

      // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.
      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator["return"]) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError(
              "The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value;

          // Resume execution at the desired location (see delegateYield).
          context.next = delegate.nextLoc;

          // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.
          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }

        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        }

        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
      }

      // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.
      defineIteratorMethods(Gp);

      define(Gp, toStringTagSymbol, "Generator");

      // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.
      Gp[iteratorSymbol] = function () {
        return this;
      };

      Gp.toString = function () {
        return "[object Generator]";
      };

      function pushTryEntry(locs) {
        var entry = { tryLoc: locs[0] };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{ tryLoc: "root" }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function (object) {
        var keys = [];
        for (var key in object) {
          keys.push(key);
        }
        keys.reverse();

        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
          while (keys.length) {
            var key = keys.pop();
            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          }

          // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.
          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1, next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;

              return next;
            };

            return next.next = next;
          }
        }

        // Return an iterator with no values.
        return { next: doneResult };
      }
      exports.values = values;

      function doneResult() {
        return { value: undefined$1, done: true };
      }

      Context.prototype = {
        constructor: Context,

        reset: function (skipTempReset) {
          this.prev = 0;
          this.next = 0;
          // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.
          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;

          this.method = "next";
          this.arg = undefined$1;

          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },

        stop: function () {
          this.done = true;

          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;
          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },

        dispatchException: function (exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;
          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }

              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }

              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }

              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },

        abrupt: function (type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (finallyEntry &&
            (type === "break" ||
              type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },

        complete: function (record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" ||
            record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },

        finish: function (finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },

        "catch": function (tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }

          // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.
          throw new Error("illegal catch attempt");
        },

        delegateYield: function (iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        }
      };

      // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.
      return exports;

    }(
      // If this script is executing as a CommonJS module, use module.exports
      // as the regeneratorRuntime namespace. Otherwise create a new empty
      // object. Either way, the resulting object will be used to initialize
      // the regeneratorRuntime variable at the top of this file.
      module.exports
    ));

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  });

  var regenerator = runtime_1;

  function decodeBase64(base64, enableUnicode) {
    var binaryString = atob(base64);
    if (enableUnicode) {
      var binaryView = new Uint8Array(binaryString.length);
      for (var i = 0, n = binaryString.length; i < n; ++i) {
        binaryView[i] = binaryString.charCodeAt(i);
      }
      return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
    }
    return binaryString;
  }

  function createURL(base64, sourcemapArg, enableUnicodeArg) {
    var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
    var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
    var source = decodeBase64(base64, enableUnicode);
    var start = source.indexOf('\n', 10) + 1;
    var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
    var blob = new Blob([body], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
  }

  function createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg) {
    var url;
    return function WorkerFactory(options) {
      url = url || createURL(base64, sourcemapArg, enableUnicodeArg);
      return new Worker(url, options);
    };
  }

  var WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICd1c2Ugc3RyaWN0JzsKCiAgZnVuY3Rpb24gX3R5cGVvZihvYmopIHsKICAgICJAYmFiZWwvaGVscGVycyAtIHR5cGVvZiI7CgogICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gInN5bWJvbCIpIHsKICAgICAgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7CiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7CiAgICAgIH07CiAgICB9IGVsc2UgewogICAgICBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsKICAgICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gInN5bWJvbCIgOiB0eXBlb2Ygb2JqOwogICAgICB9OwogICAgfQoKICAgIHJldHVybiBfdHlwZW9mKG9iaik7CiAgfQoKICBmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7CiAgICB0cnkgewogICAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7CiAgICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7CiAgICB9IGNhdGNoIChlcnJvcikgewogICAgICByZWplY3QoZXJyb3IpOwogICAgICByZXR1cm47CiAgICB9CgogICAgaWYgKGluZm8uZG9uZSkgewogICAgICByZXNvbHZlKHZhbHVlKTsKICAgIH0gZWxzZSB7CiAgICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTsKICAgIH0KICB9CgogIGZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7CiAgICByZXR1cm4gZnVuY3Rpb24gKCkgewogICAgICB2YXIgc2VsZiA9IHRoaXMsCiAgICAgICAgICBhcmdzID0gYXJndW1lbnRzOwogICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgewogICAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTsKCiAgICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHsKICAgICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgIm5leHQiLCB2YWx1ZSk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7CiAgICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csICJ0aHJvdyIsIGVycik7CiAgICAgICAgfQoKICAgICAgICBfbmV4dCh1bmRlZmluZWQpOwogICAgICB9KTsKICAgIH07CiAgfQoKICBmdW5jdGlvbiBjcmVhdGVDb21tb25qc01vZHVsZShmbikgewogICAgdmFyIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfTsKICAJcmV0dXJuIGZuKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMpLCBtb2R1bGUuZXhwb3J0czsKICB9CgogIC8qKgogICAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLgogICAqCiAgICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlCiAgICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLgogICAqLwoKICB2YXIgcnVudGltZV8xID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSkgewogIHZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7CgogICAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTsKICAgIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTsKICAgIHZhciB1bmRlZmluZWQkMTsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuCiAgICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICJmdW5jdGlvbiIgPyBTeW1ib2wgOiB7fTsKICAgIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgIkBAaXRlcmF0b3IiOwogICAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgIkBAYXN5bmNJdGVyYXRvciI7CiAgICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8ICJAQHRvU3RyaW5nVGFnIjsKCiAgICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7CiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgewogICAgICAgIHZhbHVlOiB2YWx1ZSwKICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLAogICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSwKICAgICAgICB3cml0YWJsZTogdHJ1ZQogICAgICB9KTsKICAgICAgcmV0dXJuIG9ialtrZXldOwogICAgfQogICAgdHJ5IHsKICAgICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy4KICAgICAgZGVmaW5lKHt9LCAiIik7CiAgICB9IGNhdGNoIChlcnIpIHsKICAgICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7CiAgICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7CiAgICAgIH07CiAgICB9CgogICAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkgewogICAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci4KICAgICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7CiAgICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7CiAgICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pOwoKICAgICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LAogICAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuCiAgICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTsKCiAgICAgIHJldHVybiBnZW5lcmF0b3I7CiAgICB9CiAgICBleHBvcnRzLndyYXAgPSB3cmFwOwoKICAgIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvbgogICAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkCiAgICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmUKICAgIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2UKICAgIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWQKICAgIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmcKICAgIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlCiAgICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGUKICAgIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2gKICAgIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS4KICAgIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykgewogICAgICB0cnkgewogICAgICAgIHJldHVybiB7IHR5cGU6ICJub3JtYWwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07CiAgICAgIH0gY2F0Y2ggKGVycikgewogICAgICAgIHJldHVybiB7IHR5cGU6ICJ0aHJvdyIsIGFyZzogZXJyIH07CiAgICAgIH0KICAgIH0KCiAgICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9ICJzdXNwZW5kZWRTdGFydCI7CiAgICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9ICJzdXNwZW5kZWRZaWVsZCI7CiAgICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSAiZXhlY3V0aW5nIjsKICAgIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9ICJjb21wbGV0ZWQiOwoKICAgIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXMKICAgIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC4KICAgIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307CgogICAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kCiAgICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3IKICAgIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyCiAgICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLgogICAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge30KICAgIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge30KICAgIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge30KCiAgICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0CiAgICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LgogICAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307CiAgICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7CiAgICAgIHJldHVybiB0aGlzOwogICAgfTsKCiAgICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7CiAgICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7CiAgICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYKICAgICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiYKICAgICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7CiAgICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkCiAgICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC4KICAgICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTsKICAgIH0KCiAgICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPQogICAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7CiAgICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlOwogICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjsKICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKAogICAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwKICAgICAgdG9TdHJpbmdUYWdTeW1ib2wsCiAgICAgICJHZW5lcmF0b3JGdW5jdGlvbiIKICAgICk7CgogICAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGUKICAgIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuCiAgICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7CiAgICAgIFsibmV4dCIsICJ0aHJvdyIsICJyZXR1cm4iXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkgewogICAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7CiAgICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTsKICAgICAgICB9KTsKICAgICAgfSk7CiAgICB9CgogICAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7CiAgICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gImZ1bmN0aW9uIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7CiAgICAgIHJldHVybiBjdG9yCiAgICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fAogICAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhbgogICAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LgogICAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gIkdlbmVyYXRvckZ1bmN0aW9uIgogICAgICAgIDogZmFsc2U7CiAgICB9OwoKICAgIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikgewogICAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7CiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpOwogICAgICB9IGVsc2UgewogICAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTsKICAgICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgIkdlbmVyYXRvckZ1bmN0aW9uIik7CiAgICAgIH0KICAgICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApOwogICAgICByZXR1cm4gZ2VuRnVuOwogICAgfTsKCiAgICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG8KICAgIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0CiAgICAvLyBgaGFzT3duLmNhbGwodmFsdWUsICJfX2F3YWl0IilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpcwogICAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC4KICAgIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHsKICAgICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07CiAgICB9OwoKICAgIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkgewogICAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkgewogICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpOwogICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gInRocm93IikgewogICAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZzsKICAgICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTsKICAgICAgICAgIGlmICh2YWx1ZSAmJgogICAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gIm9iamVjdCIgJiYKICAgICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgIl9fYXdhaXQiKSkgewogICAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7CiAgICAgICAgICAgICAgaW52b2tlKCJuZXh0IiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7CiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikgewogICAgICAgICAgICAgIGludm9rZSgidGhyb3ciLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfQoKICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkgewogICAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lcwogICAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGUKICAgICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uCiAgICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDsKICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpOwogICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHsKICAgICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2sKICAgICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLgogICAgICAgICAgICByZXR1cm4gaW52b2tlKCJ0aHJvdyIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpOwogICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICB9CgogICAgICB2YXIgcHJldmlvdXNQcm9taXNlOwoKICAgICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykgewogICAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkgewogICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHsKICAgICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpOwogICAgICAgICAgfSk7CiAgICAgICAgfQoKICAgICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID0KICAgICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWwKICAgICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLAogICAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZgogICAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG8KICAgICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLAogICAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG8KICAgICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHkKICAgICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzCiAgICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseQogICAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGUKICAgICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5CiAgICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuCiAgICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbigKICAgICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsCiAgICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyCiAgICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci4KICAgICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcKICAgICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpOwogICAgICB9CgogICAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LAogICAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS4KICAgICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTsKICAgIH0KCiAgICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpOwogICAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7CiAgICAgIHJldHVybiB0aGlzOwogICAgfTsKICAgIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7CgogICAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZgogICAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mCiAgICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci4KICAgIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHsKICAgICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTsKCiAgICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoCiAgICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksCiAgICAgICAgUHJvbWlzZUltcGwKICAgICAgKTsKCiAgICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikKICAgICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLgogICAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHsKICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7CiAgICAgICAgICB9KTsKICAgIH07CgogICAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7CiAgICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7CgogICAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7CiAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykgewogICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nIik7CiAgICAgICAgfQoKICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7CiAgICAgICAgICBpZiAobWV0aG9kID09PSAidGhyb3ciKSB7CiAgICAgICAgICAgIHRocm93IGFyZzsKICAgICAgICAgIH0KCiAgICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOgogICAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZQogICAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTsKICAgICAgICB9CgogICAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kOwogICAgICAgIGNvbnRleHQuYXJnID0gYXJnOwoKICAgICAgICB3aGlsZSAodHJ1ZSkgewogICAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTsKICAgICAgICAgIGlmIChkZWxlZ2F0ZSkgewogICAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTsKICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7CiAgICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTsKICAgICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7CiAgICAgICAgICAgIH0KICAgICAgICAgIH0KCiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09ICJuZXh0IikgewogICAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3MKICAgICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi4KICAgICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnOwoKICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09ICJ0aHJvdyIpIHsKICAgICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7CiAgICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDsKICAgICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZzsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7CgogICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gInJldHVybiIpIHsKICAgICAgICAgICAgY29udGV4dC5hYnJ1cHQoInJldHVybiIsIGNvbnRleHQuYXJnKTsKICAgICAgICAgIH0KCiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nOwoKICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTsKICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gIm5vcm1hbCIpIHsKICAgICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PQogICAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uCiAgICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lCiAgICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZAogICAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDsKCiAgICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7CiAgICAgICAgICAgICAgY29udGludWU7CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIHJldHVybiB7CiAgICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsCiAgICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lCiAgICAgICAgICAgIH07CgogICAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gInRocm93IikgewogICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkOwogICAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlCiAgICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuCiAgICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gInRocm93IjsKICAgICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnOwogICAgICAgICAgfQogICAgICAgIH0KICAgICAgfTsKICAgIH0KCiAgICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGUKICAgIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGUKICAgIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLAogICAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuCiAgICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7CiAgICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07CiAgICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCQxKSB7CiAgICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93CiAgICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC4KICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDsKCiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSAidGhyb3ciKSB7CiAgICAgICAgICAvLyBOb3RlOiBbInJldHVybiJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS4KICAgICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvclsicmV0dXJuIl0pIHsKICAgICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYQogICAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuCiAgICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gInJldHVybiI7CiAgICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkJDE7CiAgICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpOwoKICAgICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSAidGhyb3ciKSB7CiAgICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb20KICAgICAgICAgICAgICAvLyAicmV0dXJuIiB0byAidGhyb3ciLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LgogICAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsOwogICAgICAgICAgICB9CiAgICAgICAgICB9CgogICAgICAgICAgY29udGV4dC5tZXRob2QgPSAidGhyb3ciOwogICAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKAogICAgICAgICAgICAiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZCIpOwogICAgICAgIH0KCiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7CiAgICAgIH0KCiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7CgogICAgICBpZiAocmVjb3JkLnR5cGUgPT09ICJ0aHJvdyIpIHsKICAgICAgICBjb250ZXh0Lm1ldGhvZCA9ICJ0aHJvdyI7CiAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnOwogICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsOwogICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsOwogICAgICB9CgogICAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7CgogICAgICBpZiAoISBpbmZvKSB7CiAgICAgICAgY29udGV4dC5tZXRob2QgPSAidGhyb3ciOwogICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcigiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3QiKTsKICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDsKICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDsKICAgICAgfQoKICAgICAgaWYgKGluZm8uZG9uZSkgewogICAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5CiAgICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS4KICAgICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTsKCiAgICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLgogICAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7CgogICAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyAidGhyb3ciIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGUKICAgICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmCiAgICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzICJuZXh0IiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuCiAgICAgICAgLy8gImNvbnN1bWVkIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhcwogICAgICAgIC8vICJyZXR1cm4iLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZQogICAgICAgIC8vIG91dGVyIGdlbmVyYXRvci4KICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09ICJyZXR1cm4iKSB7CiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9ICJuZXh0IjsKICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkJDE7CiAgICAgICAgfQoKICAgICAgfSBlbHNlIHsKICAgICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuCiAgICAgICAgcmV0dXJuIGluZm87CiAgICAgIH0KCiAgICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoCiAgICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuCiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsOwogICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDsKICAgIH0KCiAgICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZQogICAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLgogICAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTsKCiAgICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCAiR2VuZXJhdG9yIik7CgogICAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGUKICAgIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlCiAgICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvcgogICAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uCiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy4KICAgIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkgewogICAgICByZXR1cm4gdGhpczsKICAgIH07CgogICAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHsKICAgICAgcmV0dXJuICJbb2JqZWN0IEdlbmVyYXRvcl0iOwogICAgfTsKCiAgICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykgewogICAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9OwoKICAgICAgaWYgKDEgaW4gbG9jcykgewogICAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTsKICAgICAgfQoKICAgICAgaWYgKDIgaW4gbG9jcykgewogICAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdOwogICAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTsKICAgICAgfQoKICAgICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpOwogICAgfQoKICAgIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHsKICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307CiAgICAgIHJlY29yZC50eXBlID0gIm5vcm1hbCI7CiAgICAgIGRlbGV0ZSByZWNvcmQuYXJnOwogICAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkOwogICAgfQoKICAgIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHsKICAgICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoCiAgICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb20KICAgICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LgogICAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6ICJyb290IiB9XTsKICAgICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpOwogICAgICB0aGlzLnJlc2V0KHRydWUpOwogICAgfQoKICAgIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkgewogICAgICB2YXIga2V5cyA9IFtdOwogICAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7CiAgICAgICAga2V5cy5wdXNoKGtleSk7CiAgICAgIH0KICAgICAga2V5cy5yZXZlcnNlKCk7CgogICAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcAogICAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLgogICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHsKICAgICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHsKICAgICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpOwogICAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHsKICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTsKICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7CiAgICAgICAgICAgIHJldHVybiBuZXh0OwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlCiAgICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXMKICAgICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi4KICAgICAgICBuZXh0LmRvbmUgPSB0cnVlOwogICAgICAgIHJldHVybiBuZXh0OwogICAgICB9OwogICAgfTsKCiAgICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHsKICAgICAgaWYgKGl0ZXJhYmxlKSB7CiAgICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdOwogICAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkgewogICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpOwogICAgICAgIH0KCiAgICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSAiZnVuY3Rpb24iKSB7CiAgICAgICAgICByZXR1cm4gaXRlcmFibGU7CiAgICAgICAgfQoKICAgICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHsKICAgICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkgewogICAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7CiAgICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkgewogICAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldOwogICAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7CiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQkMTsKICAgICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTsKCiAgICAgICAgICAgIHJldHVybiBuZXh0OwogICAgICAgICAgfTsKCiAgICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDsKICAgICAgICB9CiAgICAgIH0KCiAgICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy4KICAgICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9OwogICAgfQogICAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7CgogICAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHsKICAgICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCQxLCBkb25lOiB0cnVlIH07CiAgICB9CgogICAgQ29udGV4dC5wcm90b3R5cGUgPSB7CiAgICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LAoKICAgICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHsKICAgICAgICB0aGlzLnByZXYgPSAwOwogICAgICAgIHRoaXMubmV4dCA9IDA7CiAgICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3MKICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLgogICAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQkMTsKICAgICAgICB0aGlzLmRvbmUgPSBmYWxzZTsKICAgICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDsKCiAgICAgICAgdGhpcy5tZXRob2QgPSAibmV4dCI7CiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQkMTsKCiAgICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7CgogICAgICAgIGlmICghc2tpcFRlbXBSZXNldCkgewogICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7CiAgICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6CiAgICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gInQiICYmCiAgICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJgogICAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkgewogICAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQkMTsKICAgICAgICAgICAgfQogICAgICAgICAgfQogICAgICAgIH0KICAgICAgfSwKCiAgICAgIHN0b3A6IGZ1bmN0aW9uKCkgewogICAgICAgIHRoaXMuZG9uZSA9IHRydWU7CgogICAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07CiAgICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjsKICAgICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSAidGhyb3ciKSB7CiAgICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZzsKICAgICAgICB9CgogICAgICAgIHJldHVybiB0aGlzLnJ2YWw7CiAgICAgIH0sCgogICAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7CiAgICAgICAgaWYgKHRoaXMuZG9uZSkgewogICAgICAgICAgdGhyb3cgZXhjZXB0aW9uOwogICAgICAgIH0KCiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzOwogICAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkgewogICAgICAgICAgcmVjb3JkLnR5cGUgPSAidGhyb3ciOwogICAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjsKICAgICAgICAgIGNvbnRleHQubmV4dCA9IGxvYzsKCiAgICAgICAgICBpZiAoY2F1Z2h0KSB7CiAgICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssCiAgICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuCiAgICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gIm5leHQiOwogICAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCQxOwogICAgICAgICAgfQoKICAgICAgICAgIHJldHVybiAhISBjYXVnaHQ7CiAgICAgICAgfQoKICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7CiAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07CiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjsKCiAgICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSAicm9vdCIpIHsKICAgICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGUKICAgICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvCiAgICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uCiAgICAgICAgICAgIHJldHVybiBoYW5kbGUoImVuZCIpOwogICAgICAgICAgfQoKICAgICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7CiAgICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCAiY2F0Y2hMb2MiKTsKICAgICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgImZpbmFsbHlMb2MiKTsKCiAgICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7CiAgICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7CiAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTsKICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHsKICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7CiAgICAgICAgICAgICAgfQoKICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkgewogICAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykgewogICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7CiAgICAgICAgICAgICAgfQoKICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7CiAgICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHsKICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7CiAgICAgICAgICAgICAgfQoKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5Iik7CiAgICAgICAgICAgIH0KICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIH0sCgogICAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykgewogICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHsKICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTsKICAgICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmCiAgICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksICJmaW5hbGx5TG9jIikgJiYKICAgICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7CiAgICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBpZiAoZmluYWxseUVudHJ5ICYmCiAgICAgICAgICAgICh0eXBlID09PSAiYnJlYWsiIHx8CiAgICAgICAgICAgICB0eXBlID09PSAiY29udGludWUiKSAmJgogICAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJgogICAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHsKICAgICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGEKICAgICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay4KICAgICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7CiAgICAgICAgfQoKICAgICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTsKICAgICAgICByZWNvcmQudHlwZSA9IHR5cGU7CiAgICAgICAgcmVjb3JkLmFyZyA9IGFyZzsKCiAgICAgICAgaWYgKGZpbmFsbHlFbnRyeSkgewogICAgICAgICAgdGhpcy5tZXRob2QgPSAibmV4dCI7CiAgICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYzsKICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsOwogICAgICAgIH0KCiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTsKICAgICAgfSwKCiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7CiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSAidGhyb3ciKSB7CiAgICAgICAgICB0aHJvdyByZWNvcmQuYXJnOwogICAgICAgIH0KCiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSAiYnJlYWsiIHx8CiAgICAgICAgICAgIHJlY29yZC50eXBlID09PSAiY29udGludWUiKSB7CiAgICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnOwogICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09ICJyZXR1cm4iKSB7CiAgICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7CiAgICAgICAgICB0aGlzLm1ldGhvZCA9ICJyZXR1cm4iOwogICAgICAgICAgdGhpcy5uZXh0ID0gImVuZCI7CiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gIm5vcm1hbCIgJiYgYWZ0ZXJMb2MpIHsKICAgICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jOwogICAgICAgIH0KCiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7CiAgICAgIH0sCgogICAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHsKICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7CiAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07CiAgICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykgewogICAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTsKICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7CiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsOwogICAgICAgICAgfQogICAgICAgIH0KICAgICAgfSwKCiAgICAgICJjYXRjaCI6IGZ1bmN0aW9uKHRyeUxvYykgewogICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHsKICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTsKICAgICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykgewogICAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjsKICAgICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSAidGhyb3ciKSB7CiAgICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7CiAgICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIHRocm93bjsKICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvbgogICAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay4KICAgICAgICB0aHJvdyBuZXcgRXJyb3IoImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdCIpOwogICAgICB9LAoKICAgICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHsKICAgICAgICB0aGlzLmRlbGVnYXRlID0gewogICAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksCiAgICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLAogICAgICAgICAgbmV4dExvYzogbmV4dExvYwogICAgICAgIH07CgogICAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gIm5leHQiKSB7CiAgICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndAogICAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLgogICAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQkMTsKICAgICAgICB9CgogICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsOwogICAgICB9CiAgICB9OwoKICAgIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUKICAgIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZQogICAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlCiAgICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLgogICAgcmV0dXJuIGV4cG9ydHM7CgogIH0oCiAgICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0cwogICAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHkKICAgIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemUKICAgIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuCiAgICBtb2R1bGUuZXhwb3J0cyAKICApKTsKCiAgdHJ5IHsKICAgIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7CiAgfSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHsKICAgIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlCiAgICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3QKICAgIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZQogICAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsCiAgICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2UKICAgIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmCiAgICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYQogICAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlCiAgICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS4KICAgIEZ1bmN0aW9uKCJyIiwgInJlZ2VuZXJhdG9yUnVudGltZSA9IHIiKShydW50aW1lKTsKICB9CiAgfSk7CgogIHZhciByZWdlbmVyYXRvciA9IHJ1bnRpbWVfMTsKCiAgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgewogICAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsKICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uIik7CiAgICB9CiAgfQoKICBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7CiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7CiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07CiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsKICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOwogICAgICBpZiAoInZhbHVlIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsKICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOwogICAgfQogIH0KCiAgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgewogICAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7CiAgICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7CiAgICByZXR1cm4gQ29uc3RydWN0b3I7CiAgfQoKICB2YXIgV0FTTV9CQVNFNjQgPSAnQUdGemJRRUFBQUFCUkF4Z0FuOS9BWDlnQVg4QVlBRi9BWDlnQW45L0FHQURmMzkvQUdBRWYzOS9md0YvWUFGOUFYMWdBWHdCZldBQUFYOWdBMzkvZndGL1lBSjlmd0YvWUFKOGZ3RjhBZzhCQTJWdWRnWnRaVzF2Y25rQ0FBSURHeG9DQWdFQkFBTUFBQUlFQXdjSEN3a0tCZ1lFQlFFRkFBQUJDQVlJQVg4QlFhQ2lCQXNIalFJS0JtMWhiR3h2WXdBQUUzQjJYMlJ2ZDI1ellXMXdiR1Z5WDJsdWFYUUFFeFZ3ZGw5a2IzZHVjMkZ0Y0d4bGNsOWtaV3hsZEdVQUZCWndkbDlrYjNkdWMyRnRjR3hsY2w5d2NtOWpaWE56QUJVM2NIWmZaRzkzYm5OaGJYQnNaWEpmWTI5dWRtVnlkRjl1ZFcxZmMyRnRjR3hsYzE5MGIxOXBibkIxZEY5ellXMXdiR1ZmY21GMFpRQVdPSEIyWDJSdmQyNXpZVzF3YkdWeVgyTnZiblpsY25SZmJuVnRYM05oYlhCc1pYTmZkRzlmYjNWMGNIVjBYM05oYlhCc1pWOXlZWFJsQUJjVWNIWmZaRzkzYm5OaGJYQnNaWEpmY21WelpYUUFHQVJtY21WbEFBSVdjSFpmWkc5M2JuTmhiWEJzWlhKZmRtVnljMmx2YmdBWkRXRnNhV2R1WldSZllXeHNiMk1BQndyc2hBRWFCZ0FnQUJBQkM3OHdBUXQvSXdCQkVHc2lDeVFBQWtCQndCNG9BZ0FOQUVFQUVBaEJvS0lFYXlJRVFka0FTUTBBUVlBaUtBSUFJZ0pGQkVCQmpDSkNmemNDQUVHRUlrS0FnSVNBZ0lEQUFEY0NBRUdBSWlBTFFRaHFRWEJ4UWRpcTFhb0ZjeUlDTmdJQVFaUWlRUUEyQWdCQjVDRkJBRFlDQUF0QjdDRWdCRFlDQUVIb0lVR2dvZ1EyQWdCQnVCNUJvS0lFTmdJQVFjd2VJQUkyQWdCQnlCNUJmellDQUFOQUlBRkIyQjVxSUFGQjBCNXFJZ0kyQWdBZ0FVSGNIbW9nQWpZQ0FDQUJRUWhxSWdGQmdBSkhEUUFMUVFnaUFVR2tvZ1JxSUFRZ0FXdEJTR29pQWtFQmNqWUNBRUhFSGtHUUlpZ0NBRFlDQUVIQUhpQUJRYUNpQkdvMkFnQkJ0QjRnQWpZQ0FDQUVRZXloQkdwQk9EWUNBQXNDUUFKQUFrQUNRQUpBQWtBQ1FBSkFBa0FDUUFKQUlBQkI3QUZOQkVCQnFCNG9BZ0FpQmtFUUlBQkJFMnBCY0hFZ0FFRUxTUnNpQkVFRGRpSUNkaUlCUVFOeEJFQWdBVUVCY1NBQ2NrRUJjeUlFUVFOMElnTkIyQjVxS0FJQUlnSkJDR29oQVFKQUlBSW9BZ2dpQUNBRFFkQWVhaUlEUmdSQVFhZ2VJQVpCZmlBRWQzRTJBZ0FNQVF0QnVCNG9BZ0FhSUFNZ0FEWUNDQ0FBSUFNMkFnd0xJQUlnQkVFRGRDSUFRUU55TmdJRUlBQWdBbW9pQWlBQ0tBSUVRUUZ5TmdJRURBd0xJQVJCc0I0b0FnQWlDRTBOQVNBQkJFQUNRQ0FCSUFKMFFRSWdBblFpQVVFQUlBRnJjbkVpQVVFQUlBRnJjVUYvYWlJQklBRkJESFpCRUhFaUFYWWlBa0VGZGtFSWNTSUFJQUZ5SUFJZ0FIWWlBVUVDZGtFRWNTSUNjaUFCSUFKMklnRkJBWFpCQW5FaUFuSWdBU0FDZGlJQlFRRjJRUUZ4SWdKeUlBRWdBblpxSWdCQkEzUWlBMEhZSG1vb0FnQWlBaWdDQ0NJQklBTkIwQjVxSWdOR0JFQkJxQjRnQmtGK0lBQjNjU0lHTmdJQURBRUxRYmdlS0FJQUdpQURJQUUyQWdnZ0FTQUROZ0lNQ3lBQ1FRaHFJUUVnQWlBRVFRTnlOZ0lFSUFJZ0FFRURkQ0lBYWlBQUlBUnJJZ0EyQWdBZ0FpQUVhaUlESUFCQkFYSTJBZ1FnQ0FSQUlBaEJBM1lpQlVFRGRFSFFIbW9oQkVHOEhpZ0NBQ0VDQW44Z0JrRUJJQVYwSWdWeFJRUkFRYWdlSUFVZ0JuSTJBZ0FnQkF3QkN5QUVLQUlJQ3lJRklBSTJBZ3dnQkNBQ05nSUlJQUlnQkRZQ0RDQUNJQVUyQWdnTFFid2VJQU0yQWdCQnNCNGdBRFlDQUF3TUMwR3NIaWdDQUNJSlJRMEJJQWxCQUNBSmEzRkJmMm9pQVNBQlFReDJRUkJ4SWdGMklnSkJCWFpCQ0hFaUFDQUJjaUFDSUFCMklnRkJBblpCQkhFaUFuSWdBU0FDZGlJQlFRRjJRUUp4SWdKeUlBRWdBbllpQVVFQmRrRUJjU0lDY2lBQklBSjJha0VDZEVIWUlHb29BZ0FpQXlnQ0JFRjRjU0FFYXlFQ0lBTWhBQU5BQWtBZ0FDZ0NFQ0lCUlFSQUlBQkJGR29vQWdBaUFVVU5BUXNnQVNnQ0JFRjRjU0FFYXlJQUlBSWdBQ0FDU1NJQUd5RUNJQUVnQXlBQUd5RURJQUVoQUF3QkN3c2dBeWdDR0NFS0lBTWdBeWdDRENJRlJ3UkFRYmdlS0FJQUlBTW9BZ2dpQVUwRVFDQUJLQUlNR2dzZ0JTQUJOZ0lJSUFFZ0JUWUNEQXdMQ3lBRFFSUnFJZ0FvQWdBaUFVVUVRQ0FES0FJUUlnRkZEUU1nQTBFUWFpRUFDd05BSUFBaEJ5QUJJZ1ZCRkdvaUFDZ0NBQ0lCRFFBZ0JVRVFhaUVBSUFVb0FoQWlBUTBBQ3lBSFFRQTJBZ0FNQ2d0QmZ5RUVJQUJCdjM5TERRQWdBRUVUYWlJQlFYQnhJUVJCckI0b0FnQWlDRVVOQUFKL1FRQWdBVUVJZGlJQlJRMEFHa0VmSUFSQi8vLy9CMHNOQUJvZ0FTQUJRWUQrUDJwQkVIWkJDSEVpQW5RaUFTQUJRWURnSDJwQkVIWkJCSEVpQVhRaUFDQUFRWUNBRDJwQkVIWkJBbkVpQUhSQkQzWWdBU0FDY2lBQWNtc2lBVUVCZENBRUlBRkJGV3AyUVFGeGNrRWNhZ3NoQjBFQUlBUnJJUUFDUUFKQUFrQWdCMEVDZEVIWUlHb29BZ0FpQWtVRVFFRUFJUUVNQVFzZ0JFRUFRUmtnQjBFQmRtc2dCMEVmUmh0MElRTkJBQ0VCQTBBQ1FDQUNLQUlFUVhoeElBUnJJZ1lnQUU4TkFDQUNJUVVnQmlJQURRQkJBQ0VBSUFJaEFRd0RDeUFCSUFKQkZHb29BZ0FpQmlBR0lBSWdBMEVkZGtFRWNXcEJFR29vQWdBaUFrWWJJQUVnQmhzaEFTQURJQUpCQUVkMElRTWdBZzBBQ3dzZ0FTQUZja1VFUUVFQ0lBZDBJZ0ZCQUNBQmEzSWdDSEVpQVVVTkF5QUJRUUFnQVd0eFFYOXFJZ0VnQVVFTWRrRVFjU0lCZGlJQ1FRVjJRUWh4SWdNZ0FYSWdBaUFEZGlJQlFRSjJRUVJ4SWdKeUlBRWdBbllpQVVFQmRrRUNjU0lDY2lBQklBSjJJZ0ZCQVhaQkFYRWlBbklnQVNBQ2RtcEJBblJCMkNCcUtBSUFJUUVMSUFGRkRRRUxBMEFnQVNnQ0JFRjRjU0FFYXlJR0lBQkpJUU1nQmlBQUlBTWJJUUFnQVNBRklBTWJJUVVnQVNnQ0VDSUNCSDhnQWdVZ0FVRVVhaWdDQUFzaUFRMEFDd3NnQlVVTkFDQUFRYkFlS0FJQUlBUnJUdzBBSUFVb0FoZ2hCeUFGSUFVb0Fnd2lBMGNFUUVHNEhpZ0NBQ0FGS0FJSUlnRk5CRUFnQVNnQ0RCb0xJQU1nQVRZQ0NDQUJJQU0yQWd3TUNRc2dCVUVVYWlJQ0tBSUFJZ0ZGQkVBZ0JTZ0NFQ0lCUlEwRElBVkJFR29oQWdzRFFDQUNJUVlnQVNJRFFSUnFJZ0lvQWdBaUFRMEFJQU5CRUdvaEFpQURLQUlRSWdFTkFBc2dCa0VBTmdJQURBZ0xRYkFlS0FJQUlnRWdCRThFUUVHOEhpZ0NBQ0VDQWtBZ0FTQUVheUlBUVJCUEJFQWdBaUFFYWlJRElBQkJBWEkyQWdSQnNCNGdBRFlDQUVHOEhpQUROZ0lBSUFFZ0Ftb2dBRFlDQUNBQ0lBUkJBM0kyQWdRTUFRc2dBaUFCUVFOeU5nSUVJQUVnQW1vaUFTQUJLQUlFUVFGeU5nSUVRYndlUVFBMkFnQkJzQjVCQURZQ0FBc2dBa0VJYWlFQkRBb0xRYlFlS0FJQUlnTWdCRXNFUUVIQUhpZ0NBQ0lCSUFScUlnSWdBeUFFYXlJQVFRRnlOZ0lFUWJRZUlBQTJBZ0JCd0I0Z0FqWUNBQ0FCSUFSQkEzSTJBZ1FnQVVFSWFpRUJEQW9MUVFBaEFTQUVRY2NBYWlJSUFuOUJnQ0lvQWdBRVFFR0lJaWdDQUF3QkMwR01Ja0ovTndJQVFZUWlRb0NBaElDQWdNQUFOd0lBUVlBaUlBdEJER3BCY0hGQjJLclZxZ1Z6TmdJQVFaUWlRUUEyQWdCQjVDRkJBRFlDQUVHQWdBUUxJZ0pxSWdaQkFDQUNheUlIY1NJRklBUk5CRUJCbUNKQk1EWUNBQXdLQ3dKQVFlQWhLQUlBSWdGRkRRQkIyQ0VvQWdBaUFpQUZhaUlBSUFKTFFRQWdBQ0FCVFJzTkFFRUFJUUZCbUNKQk1EWUNBQXdLQzBIa0lTMEFBRUVFY1EwRUFrQUNRRUhBSGlnQ0FDSUNCRUJCNkNFaEFRTkFJQUVvQWdBaUFDQUNUUVJBSUFBZ0FTZ0NCR29nQWtzTkF3c2dBU2dDQ0NJQkRRQUxDMEVBRUFnaUEwRi9SZzBGSUFVaEJrR0VJaWdDQUNJQlFYOXFJZ0lnQTNFRVFDQUZJQU5ySUFJZ0EycEJBQ0FCYTNGcUlRWUxJQVlnQkUwTkJTQUdRZjcvLy84SFN3MEZRZUFoS0FJQUlnRUVRRUhZSVNnQ0FDSUNJQVpxSWdBZ0FrME5CaUFBSUFGTERRWUxJQVlRQ0NJQklBTkhEUUVNQndzZ0JpQURheUFIY1NJR1FmNy8vLzhIU3cwRUlBWVFDQ0lESUFFb0FnQWdBU2dDQkdwR0RRTWdBeUVCQ3dKQUlBUkJ5QUJxSUFaTkRRQWdBVUYvUmcwQVFZZ2lLQUlBSWdJZ0NDQUdhMnBCQUNBQ2EzRWlBa0grLy8vL0Iwc0VRQ0FCSVFNTUJ3c2dBaEFJUVg5SEJFQWdBaUFHYWlFR0lBRWhBd3dIQzBFQUlBWnJFQWdhREFRTElBRWhBeUFCUVg5SERRVU1Bd3RCQUNFRkRBY0xRUUFoQXd3RkN5QURRWDlIRFFJTFFlUWhRZVFoS0FJQVFRUnlOZ0lBQ3lBRlFmNy8vLzhIU3cwQklBVVFDQ0lEUVFBUUNDSUJUdzBCSUFOQmYwWU5BU0FCUVg5R0RRRWdBU0FEYXlJR0lBUkJPR3BORFFFTFFkZ2hRZGdoS0FJQUlBWnFJZ0UyQWdBZ0FVSGNJU2dDQUVzRVFFSGNJU0FCTmdJQUN3SkFBa0FDUUVIQUhpZ0NBQ0lDQkVCQjZDRWhBUU5BSUFNZ0FTZ0NBQ0lBSUFFb0FnUWlCV3BHRFFJZ0FTZ0NDQ0lCRFFBTERBSUxRYmdlS0FJQUlnRkJBQ0FESUFGUEcwVUVRRUc0SGlBRE5nSUFDMEVBSVFGQjdDRWdCallDQUVIb0lTQUROZ0lBUWNnZVFYODJBZ0JCekI1QmdDSW9BZ0EyQWdCQjlDRkJBRFlDQUFOQUlBRkIyQjVxSUFGQjBCNXFJZ0kyQWdBZ0FVSGNIbW9nQWpZQ0FDQUJRUWhxSWdGQmdBSkhEUUFMSUFOQmVDQURhMEVQY1VFQUlBTkJDR3BCRDNFYklnRnFJZ0lnQmtGSWFpSUFJQUZySWdGQkFYSTJBZ1JCeEI1QmtDSW9BZ0EyQWdCQnRCNGdBVFlDQUVIQUhpQUNOZ0lBSUFBZ0EycEJPRFlDQkF3Q0N5QUJMUUFNUVFoeERRQWdBeUFDVFEwQUlBQWdBa3NOQUNBQ1FYZ2dBbXRCRDNGQkFDQUNRUWhxUVE5eEd5SUFhaUlEUWJRZUtBSUFJQVpxSWdjZ0FHc2lBRUVCY2pZQ0JDQUJJQVVnQm1vMkFnUkJ4QjVCa0NJb0FnQTJBZ0JCdEI0Z0FEWUNBRUhBSGlBRE5nSUFJQUlnQjJwQk9EWUNCQXdCQ3lBRFFiZ2VLQUlBSWdWSkJFQkJ1QjRnQXpZQ0FDQURJUVVMSUFNZ0Jtb2hBRUhvSVNFQkFrQUNRQUpBQWtBQ1FBSkFBMEFnQUNBQktBSUFSd1JBSUFFb0FnZ2lBUTBCREFJTEN5QUJMUUFNUVFoeFJRMEJDMEhvSVNFQkEwQWdBU2dDQUNJQUlBSk5CRUFnQUNBQktBSUVhaUlBSUFKTERRTUxJQUVvQWdnaEFRd0FDd0FMSUFFZ0F6WUNBQ0FCSUFFb0FnUWdCbW8yQWdRZ0EwRjRJQU5yUVE5eFFRQWdBMEVJYWtFUGNSdHFJZ2NnQkVFRGNqWUNCQ0FBUVhnZ0FHdEJEM0ZCQUNBQVFRaHFRUTl4RzJvaUF5QUhheUFFYXlFQklBUWdCMm9oQUNBQ0lBTkdCRUJCd0I0Z0FEWUNBRUcwSGtHMEhpZ0NBQ0FCYWlJQk5nSUFJQUFnQVVFQmNqWUNCQXdEQ3lBRFFid2VLQUlBUmdSQVFid2VJQUEyQWdCQnNCNUJzQjRvQWdBZ0FXb2lBVFlDQUNBQUlBRkJBWEkyQWdRZ0FDQUJhaUFCTmdJQURBTUxJQU1vQWdRaUFrRURjVUVCUmdSQUlBSkJlSEVoQ0FKQUlBSkIvd0ZOQkVBZ0F5Z0NDQ0lHSUFKQkEzWWlDVUVEZEVIUUhtcEhHaUFHSUFNb0Fnd2lCRVlFUUVHb0hrR29IaWdDQUVGK0lBbDNjVFlDQUF3Q0N5QUVJQVkyQWdnZ0JpQUVOZ0lNREFFTElBTW9BaGdoQ1FKQUlBTWdBeWdDRENJR1J3UkFJQVVnQXlnQ0NDSUNUUVJBSUFJb0Fnd2FDeUFHSUFJMkFnZ2dBaUFHTmdJTURBRUxBa0FnQTBFVWFpSUNLQUlBSWdRTkFDQURRUkJxSWdJb0FnQWlCQTBBUVFBaEJnd0JDd05BSUFJaEJTQUVJZ1pCRkdvaUFpZ0NBQ0lFRFFBZ0JrRVFhaUVDSUFZb0FoQWlCQTBBQ3lBRlFRQTJBZ0FMSUFsRkRRQUNRQ0FESUFNb0Fod2lCRUVDZEVIWUlHb2lBaWdDQUVZRVFDQUNJQVkyQWdBZ0JnMEJRYXdlUWF3ZUtBSUFRWDRnQkhkeE5nSUFEQUlMSUFsQkVFRVVJQWtvQWhBZ0EwWWJhaUFHTmdJQUlBWkZEUUVMSUFZZ0NUWUNHQ0FES0FJUUlnSUVRQ0FHSUFJMkFoQWdBaUFHTmdJWUN5QURLQUlVSWdKRkRRQWdCa0VVYWlBQ05nSUFJQUlnQmpZQ0dBc2dBeUFJYWlFRElBRWdDR29oQVFzZ0F5QURLQUlFUVg1eE5nSUVJQUFnQVdvZ0FUWUNBQ0FBSUFGQkFYSTJBZ1FnQVVIL0FVMEVRQ0FCUVFOMklnSkJBM1JCMEI1cUlRRUNmMEdvSGlnQ0FDSUVRUUVnQW5RaUFuRkZCRUJCcUI0Z0FpQUVjallDQUNBQkRBRUxJQUVvQWdnTElnSWdBRFlDRENBQklBQTJBZ2dnQUNBQk5nSU1JQUFnQWpZQ0NBd0RDeUFBQW45QkFDQUJRUWgySWdSRkRRQWFRUjhnQVVILy8vOEhTdzBBR2lBRUlBUkJnUDQvYWtFUWRrRUljU0lDZENJRUlBUkJnT0FmYWtFUWRrRUVjU0lFZENJRElBTkJnSUFQYWtFUWRrRUNjU0lEZEVFUGRpQUNJQVJ5SUFOeWF5SUNRUUYwSUFFZ0FrRVZhblpCQVhGeVFSeHFDeUlDTmdJY0lBQkNBRGNDRUNBQ1FRSjBRZGdnYWlFRVFhd2VLQUlBSWdOQkFTQUNkQ0lGY1VVRVFDQUVJQUEyQWdCQnJCNGdBeUFGY2pZQ0FDQUFJQVEyQWhnZ0FDQUFOZ0lJSUFBZ0FEWUNEQXdEQ3lBQlFRQkJHU0FDUVFGMmF5QUNRUjlHRzNRaEFpQUVLQUlBSVFNRFFDQURJZ1FvQWdSQmVIRWdBVVlOQWlBQ1FSMTJJUU1nQWtFQmRDRUNJQVFnQTBFRWNXcEJFR29pQlNnQ0FDSUREUUFMSUFVZ0FEWUNBQ0FBSUFRMkFoZ2dBQ0FBTmdJTUlBQWdBRFlDQ0F3Q0N5QURRWGdnQTJ0QkQzRkJBQ0FEUVFocVFROXhHeUlCYWlJSElBWkJTR29pQlNBQmF5SUJRUUZ5TmdJRUlBTWdCV3BCT0RZQ0JDQUNJQUJCTnlBQWEwRVBjVUVBSUFCQlNXcEJEM0ViYWtGQmFpSUZJQVVnQWtFUWFra2JJZ1ZCSXpZQ0JFSEVIa0dRSWlnQ0FEWUNBRUcwSGlBQk5nSUFRY0FlSUFjMkFnQWdCVUVRYWtId0lTa0NBRGNDQUNBRlFlZ2hLUUlBTndJSVFmQWhJQVZCQ0dvMkFnQkI3Q0VnQmpZQ0FFSG9JU0FETmdJQVFmUWhRUUEyQWdBZ0JVRWthaUVCQTBBZ0FVRUhOZ0lBSUFBZ0FVRUVhaUlCU3cwQUN5QUNJQVZHRFFNZ0JTQUZLQUlFUVg1eE5nSUVJQVVnQlNBQ2F5SUdOZ0lBSUFJZ0JrRUJjallDQkNBR1FmOEJUUVJBSUFaQkEzWWlBRUVEZEVIUUhtb2hBUUovUWFnZUtBSUFJZ05CQVNBQWRDSUFjVVVFUUVHb0hpQUFJQU55TmdJQUlBRU1BUXNnQVNnQ0NBc2lBQ0FDTmdJTUlBRWdBallDQ0NBQ0lBRTJBZ3dnQWlBQU5nSUlEQVFMSUFKQ0FEY0NFQ0FDUVJ4cUFuOUJBQ0FHUVFoMklnQkZEUUFhUVI4Z0JrSC8vLzhIU3cwQUdpQUFJQUJCZ1A0L2FrRVFka0VJY1NJQmRDSUFJQUJCZ09BZmFrRVFka0VFY1NJQWRDSURJQU5CZ0lBUGFrRVFka0VDY1NJRGRFRVBkaUFBSUFGeUlBTnlheUlCUVFGMElBWWdBVUVWYW5aQkFYRnlRUnhxQ3lJQk5nSUFJQUZCQW5SQjJDQnFJUUJCckI0b0FnQWlBMEVCSUFGMElnVnhSUVJBSUFBZ0FqWUNBRUdzSGlBRElBVnlOZ0lBSUFKQkdHb2dBRFlDQUNBQ0lBSTJBZ2dnQWlBQ05nSU1EQVFMSUFaQkFFRVpJQUZCQVhacklBRkJIMFliZENFQklBQW9BZ0FoQXdOQUlBTWlBQ2dDQkVGNGNTQUdSZzBESUFGQkhYWWhBeUFCUVFGMElRRWdBQ0FEUVFSeGFrRVFhaUlGS0FJQUlnTU5BQXNnQlNBQ05nSUFJQUpCR0dvZ0FEWUNBQ0FDSUFJMkFnd2dBaUFDTmdJSURBTUxJQVFvQWdnaEFTQUVJQUEyQWdnZ0FTQUFOZ0lNSUFCQkFEWUNHQ0FBSUFFMkFnZ2dBQ0FFTmdJTUN5QUhRUWhxSVFFTUJRc2dBQ2dDQ0NFQklBQWdBallDQ0NBQklBSTJBZ3dnQWtFWWFrRUFOZ0lBSUFJZ0FUWUNDQ0FDSUFBMkFnd0xRYlFlS0FJQUlnRWdCRTBOQUVIQUhpZ0NBQ0lDSUFScUlnQWdBU0FFYXlJQlFRRnlOZ0lFUWJRZUlBRTJBZ0JCd0I0Z0FEWUNBQ0FDSUFSQkEzSTJBZ1FnQWtFSWFpRUJEQU1MUVFBaEFVR1lJa0V3TmdJQURBSUxBa0FnQjBVTkFBSkFJQVVvQWh3aUFrRUNkRUhZSUdvaUFTZ0NBQ0FGUmdSQUlBRWdBellDQUNBRERRRkJyQjRnQ0VGK0lBSjNjU0lJTmdJQURBSUxJQWRCRUVFVUlBY29BaEFnQlVZYmFpQUROZ0lBSUFORkRRRUxJQU1nQnpZQ0dDQUZLQUlRSWdFRVFDQURJQUUyQWhBZ0FTQUROZ0lZQ3lBRlFSUnFLQUlBSWdGRkRRQWdBMEVVYWlBQk5nSUFJQUVnQXpZQ0dBc0NRQ0FBUVE5TkJFQWdCU0FBSUFScUlnRkJBM0kyQWdRZ0FTQUZhaUlCSUFFb0FnUkJBWEkyQWdRTUFRc2dCQ0FGYWlJRElBQkJBWEkyQWdRZ0JTQUVRUU55TmdJRUlBQWdBMm9nQURZQ0FDQUFRZjhCVFFSQUlBQkJBM1lpQWtFRGRFSFFIbW9oQVFKL1FhZ2VLQUlBSWdCQkFTQUNkQ0lDY1VVRVFFR29IaUFBSUFKeU5nSUFJQUVNQVFzZ0FTZ0NDQXNpQWlBRE5nSU1JQUVnQXpZQ0NDQURJQUUyQWd3Z0F5QUNOZ0lJREFFTElBTUNmMEVBSUFCQkNIWWlBa1VOQUJwQkh5QUFRZi8vL3dkTERRQWFJQUlnQWtHQS9qOXFRUkIyUVFoeElnRjBJZ0lnQWtHQTRCOXFRUkIyUVFSeElnSjBJZ1FnQkVHQWdBOXFRUkIyUVFKeElnUjBRUTkySUFFZ0FuSWdCSEpySWdGQkFYUWdBQ0FCUVJWcWRrRUJjWEpCSEdvTElnRTJBaHdnQTBJQU53SVFJQUZCQW5SQjJDQnFJUUlnQ0VFQklBRjBJZ1J4UlFSQUlBSWdBellDQUVHc0hpQUVJQWh5TmdJQUlBTWdBallDR0NBRElBTTJBZ2dnQXlBRE5nSU1EQUVMSUFCQkFFRVpJQUZCQVhacklBRkJIMFliZENFQklBSW9BZ0FoQkFKQUEwQWdCQ0lDS0FJRVFYaHhJQUJHRFFFZ0FVRWRkaUVFSUFGQkFYUWhBU0FDSUFSQkJIRnFRUkJxSWdZb0FnQWlCQTBBQ3lBR0lBTTJBZ0FnQXlBQ05nSVlJQU1nQXpZQ0RDQURJQU0yQWdnTUFRc2dBaWdDQ0NFQklBSWdBellDQ0NBQklBTTJBZ3dnQTBFQU5nSVlJQU1nQVRZQ0NDQURJQUkyQWd3TElBVkJDR29oQVF3QkN3SkFJQXBGRFFBQ1FDQURLQUljSWdCQkFuUkIyQ0JxSWdFb0FnQWdBMFlFUUNBQklBVTJBZ0FnQlEwQlFhd2VJQWxCZmlBQWQzRTJBZ0FNQWdzZ0NrRVFRUlFnQ2lnQ0VDQURSaHRxSUFVMkFnQWdCVVVOQVFzZ0JTQUtOZ0lZSUFNb0FoQWlBUVJBSUFVZ0FUWUNFQ0FCSUFVMkFoZ0xJQU5CRkdvb0FnQWlBVVVOQUNBRlFSUnFJQUUyQWdBZ0FTQUZOZ0lZQ3dKQUlBSkJEMDBFUUNBRElBSWdCR29pQVVFRGNqWUNCQ0FCSUFOcUlnRWdBU2dDQkVFQmNqWUNCQXdCQ3lBRElBUnFJZ0FnQWtFQmNqWUNCQ0FESUFSQkEzSTJBZ1FnQUNBQ2FpQUNOZ0lBSUFnRVFDQUlRUU4ySWdWQkEzUkIwQjVxSVFSQnZCNG9BZ0FoQVFKL1FRRWdCWFFpQlNBR2NVVUVRRUdvSGlBRklBWnlOZ0lBSUFRTUFRc2dCQ2dDQ0FzaUJTQUJOZ0lNSUFRZ0FUWUNDQ0FCSUFRMkFnd2dBU0FGTmdJSUMwRzhIaUFBTmdJQVFiQWVJQUkyQWdBTElBTkJDR29oQVFzZ0MwRVFhaVFBSUFFTEJnQWdBQkFEQzU0TkFRZC9Ba0FnQUVVTkFDQUFRWGhxSWdJZ0FFRjhhaWdDQUNJQlFYaHhJZ0JxSVFVQ1FDQUJRUUZ4RFFBZ0FVRURjVVVOQVNBQ0lBSW9BZ0FpQVdzaUFrRzRIaWdDQUNJRVNRMEJJQUFnQVdvaEFDQUNRYndlS0FJQVJ3UkFJQUZCL3dGTkJFQWdBaWdDQ0NJSElBRkJBM1lpQmtFRGRFSFFIbXBIR2lBSElBSW9BZ3dpQTBZRVFFR29Ia0dvSGlnQ0FFRitJQVozY1RZQ0FBd0RDeUFESUFjMkFnZ2dCeUFETmdJTURBSUxJQUlvQWhnaEJnSkFJQUlnQWlnQ0RDSURSd1JBSUFRZ0FpZ0NDQ0lCVFFSQUlBRW9BZ3dhQ3lBRElBRTJBZ2dnQVNBRE5nSU1EQUVMQWtBZ0FrRVVhaUlCS0FJQUlnUU5BQ0FDUVJCcUlnRW9BZ0FpQkEwQVFRQWhBd3dCQ3dOQUlBRWhCeUFFSWdOQkZHb2lBU2dDQUNJRURRQWdBMEVRYWlFQklBTW9BaEFpQkEwQUN5QUhRUUEyQWdBTElBWkZEUUVDUUNBQ0lBSW9BaHdpQkVFQ2RFSFlJR29pQVNnQ0FFWUVRQ0FCSUFNMkFnQWdBdzBCUWF3ZVFhd2VLQUlBUVg0Z0JIZHhOZ0lBREFNTElBWkJFRUVVSUFZb0FoQWdBa1liYWlBRE5nSUFJQU5GRFFJTElBTWdCallDR0NBQ0tBSVFJZ0VFUUNBRElBRTJBaEFnQVNBRE5nSVlDeUFDS0FJVUlnRkZEUUVnQTBFVWFpQUJOZ0lBSUFFZ0F6WUNHQXdCQ3lBRktBSUVJZ0ZCQTNGQkEwY05BQ0FGSUFGQmZuRTJBZ1JCc0I0Z0FEWUNBQ0FBSUFKcUlBQTJBZ0FnQWlBQVFRRnlOZ0lFRHdzZ0JTQUNUUTBBSUFVb0FnUWlBVUVCY1VVTkFBSkFJQUZCQW5GRkJFQWdCVUhBSGlnQ0FFWUVRRUhBSGlBQ05nSUFRYlFlUWJRZUtBSUFJQUJxSWdBMkFnQWdBaUFBUVFGeU5nSUVJQUpCdkI0b0FnQkhEUU5Cc0I1QkFEWUNBRUc4SGtFQU5nSUFEd3NnQlVHOEhpZ0NBRVlFUUVHOEhpQUNOZ0lBUWJBZVFiQWVLQUlBSUFCcUlnQTJBZ0FnQWlBQVFRRnlOZ0lFSUFBZ0Ftb2dBRFlDQUE4TElBRkJlSEVnQUdvaEFBSkFJQUZCL3dGTkJFQWdCU2dDRENFRUlBVW9BZ2dpQXlBQlFRTjJJZ1ZCQTNSQjBCNXFJZ0ZIQkVCQnVCNG9BZ0FhQ3lBRElBUkdCRUJCcUI1QnFCNG9BZ0JCZmlBRmQzRTJBZ0FNQWdzZ0FTQUVSd1JBUWJnZUtBSUFHZ3NnQkNBRE5nSUlJQU1nQkRZQ0RBd0JDeUFGS0FJWUlRWUNRQ0FGSUFVb0Fnd2lBMGNFUUVHNEhpZ0NBQ0FGS0FJSUlnRk5CRUFnQVNnQ0RCb0xJQU1nQVRZQ0NDQUJJQU0yQWd3TUFRc0NRQ0FGUVJScUlnRW9BZ0FpQkEwQUlBVkJFR29pQVNnQ0FDSUVEUUJCQUNFRERBRUxBMEFnQVNFSElBUWlBMEVVYWlJQktBSUFJZ1FOQUNBRFFSQnFJUUVnQXlnQ0VDSUVEUUFMSUFkQkFEWUNBQXNnQmtVTkFBSkFJQVVnQlNnQ0hDSUVRUUowUWRnZ2FpSUJLQUlBUmdSQUlBRWdBellDQUNBRERRRkJyQjVCckI0b0FnQkJmaUFFZDNFMkFnQU1BZ3NnQmtFUVFSUWdCaWdDRUNBRlJodHFJQU0yQWdBZ0EwVU5BUXNnQXlBR05nSVlJQVVvQWhBaUFRUkFJQU1nQVRZQ0VDQUJJQU0yQWhnTElBVW9BaFFpQVVVTkFDQURRUlJxSUFFMkFnQWdBU0FETmdJWUN5QUFJQUpxSUFBMkFnQWdBaUFBUVFGeU5nSUVJQUpCdkI0b0FnQkhEUUZCc0I0Z0FEWUNBQThMSUFVZ0FVRitjVFlDQkNBQUlBSnFJQUEyQWdBZ0FpQUFRUUZ5TmdJRUN5QUFRZjhCVFFSQUlBQkJBM1lpQVVFRGRFSFFIbW9oQUFKL1FhZ2VLQUlBSWdSQkFTQUJkQ0lCY1VVRVFFR29IaUFCSUFSeU5nSUFJQUFNQVFzZ0FDZ0NDQXNpQVNBQ05nSU1JQUFnQWpZQ0NDQUNJQUEyQWd3Z0FpQUJOZ0lJRHdzZ0FrSUFOd0lRSUFKQkhHb0NmMEVBSUFCQkNIWWlCRVVOQUJwQkh5QUFRZi8vL3dkTERRQWFJQVFnQkVHQS9qOXFRUkIyUVFoeElnRjBJZ1FnQkVHQTRCOXFRUkIyUVFSeElnUjBJZ01nQTBHQWdBOXFRUkIyUVFKeElnTjBRUTkySUFFZ0JISWdBM0pySWdGQkFYUWdBQ0FCUVJWcWRrRUJjWEpCSEdvTElnRTJBZ0FnQVVFQ2RFSFlJR29oQkFKQVFhd2VLQUlBSWdOQkFTQUJkQ0lGY1VVRVFDQUVJQUkyQWdCQnJCNGdBeUFGY2pZQ0FDQUNRUmhxSUFRMkFnQWdBaUFDTmdJSUlBSWdBallDREF3QkN5QUFRUUJCR1NBQlFRRjJheUFCUVI5R0czUWhBU0FFS0FJQUlRTUNRQU5BSUFNaUJDZ0NCRUY0Y1NBQVJnMEJJQUZCSFhZaEF5QUJRUUYwSVFFZ0JDQURRUVJ4YWtFUWFpSUZLQUlBSWdNTkFBc2dCU0FDTmdJQUlBSkJHR29nQkRZQ0FDQUNJQUkyQWd3Z0FpQUNOZ0lJREFFTElBUW9BZ2doQUNBRUlBSTJBZ2dnQUNBQ05nSU1JQUpCR0dwQkFEWUNBQ0FDSUFBMkFnZ2dBaUFFTmdJTUMwSElIa0hJSGlnQ0FFRi9haUlDTmdJQUlBSU5BRUh3SVNFQ0EwQWdBaWdDQUNJQVFRaHFJUUlnQUEwQUMwSElIa0YvTmdJQUN3dFhBZ0YvQVg0Q1FBSi9RUUFnQUVVTkFCb2dBSzBnQWExK0lnT25JZ0lnQUNBQmNrR0FnQVJKRFFBYVFYOGdBaUFEUWlDSXB4c0xJZ0lRQVNJQVJRMEFJQUJCZkdvdEFBQkJBM0ZGRFFBZ0FDQUNFQW9MSUFBTHBRd0JCbjhnQUNBQmFpRUZBa0FDUUNBQUtBSUVJZ0pCQVhFTkFDQUNRUU54UlEwQklBQW9BZ0FpQWlBQmFpRUJJQUFnQW1zaUFFRzhIaWdDQUVjRVFFRzRIaWdDQUNFSElBSkIvd0ZOQkVBZ0FDZ0NDQ0lESUFKQkEzWWlCa0VEZEVIUUhtcEhHaUFESUFBb0Fnd2lCRVlFUUVHb0hrR29IaWdDQUVGK0lBWjNjVFlDQUF3REN5QUVJQU0yQWdnZ0F5QUVOZ0lNREFJTElBQW9BaGdoQmdKQUlBQWdBQ2dDRENJRFJ3UkFJQWNnQUNnQ0NDSUNUUVJBSUFJb0Fnd2FDeUFESUFJMkFnZ2dBaUFETmdJTURBRUxBa0FnQUVFVWFpSUNLQUlBSWdRTkFDQUFRUkJxSWdJb0FnQWlCQTBBUVFBaEF3d0JDd05BSUFJaEJ5QUVJZ05CRkdvaUFpZ0NBQ0lFRFFBZ0EwRVFhaUVDSUFNb0FoQWlCQTBBQ3lBSFFRQTJBZ0FMSUFaRkRRRUNRQ0FBSUFBb0Fod2lCRUVDZEVIWUlHb2lBaWdDQUVZRVFDQUNJQU0yQWdBZ0F3MEJRYXdlUWF3ZUtBSUFRWDRnQkhkeE5nSUFEQU1MSUFaQkVFRVVJQVlvQWhBZ0FFWWJhaUFETmdJQUlBTkZEUUlMSUFNZ0JqWUNHQ0FBS0FJUUlnSUVRQ0FESUFJMkFoQWdBaUFETmdJWUN5QUFLQUlVSWdKRkRRRWdBMEVVYWlBQ05nSUFJQUlnQXpZQ0dBd0JDeUFGS0FJRUlnSkJBM0ZCQTBjTkFDQUZJQUpCZm5FMkFnUkJzQjRnQVRZQ0FDQUZJQUUyQWdBZ0FDQUJRUUZ5TmdJRUR3c0NRQ0FGS0FJRUlnSkJBbkZGQkVBZ0JVSEFIaWdDQUVZRVFFSEFIaUFBTmdJQVFiUWVRYlFlS0FJQUlBRnFJZ0UyQWdBZ0FDQUJRUUZ5TmdJRUlBQkJ2QjRvQWdCSERRTkJzQjVCQURZQ0FFRzhIa0VBTmdJQUR3c2dCVUc4SGlnQ0FFWUVRRUc4SGlBQU5nSUFRYkFlUWJBZUtBSUFJQUZxSWdFMkFnQWdBQ0FCUVFGeU5nSUVJQUFnQVdvZ0FUWUNBQThMUWJnZUtBSUFJUWNnQWtGNGNTQUJhaUVCQWtBZ0FrSC9BVTBFUUNBRktBSU1JUVFnQlNnQ0NDSURJQUpCQTNZaUJVRURkRUhRSG1wSEdpQURJQVJHQkVCQnFCNUJxQjRvQWdCQmZpQUZkM0UyQWdBTUFnc2dCQ0FETmdJSUlBTWdCRFlDREF3QkN5QUZLQUlZSVFZQ1FDQUZJQVVvQWd3aUEwY0VRQ0FISUFVb0FnZ2lBazBFUUNBQ0tBSU1HZ3NnQXlBQ05nSUlJQUlnQXpZQ0RBd0JDd0pBSUFWQkZHb2lBaWdDQUNJRURRQWdCVUVRYWlJQ0tBSUFJZ1FOQUVFQUlRTU1BUXNEUUNBQ0lRY2dCQ0lEUVJScUlnSW9BZ0FpQkEwQUlBTkJFR29oQWlBREtBSVFJZ1FOQUFzZ0IwRUFOZ0lBQ3lBR1JRMEFBa0FnQlNBRktBSWNJZ1JCQW5SQjJDQnFJZ0lvQWdCR0JFQWdBaUFETmdJQUlBTU5BVUdzSGtHc0hpZ0NBRUYrSUFSM2NUWUNBQXdDQ3lBR1FSQkJGQ0FHS0FJUUlBVkdHMm9nQXpZQ0FDQURSUTBCQ3lBRElBWTJBaGdnQlNnQ0VDSUNCRUFnQXlBQ05nSVFJQUlnQXpZQ0dBc2dCU2dDRkNJQ1JRMEFJQU5CRkdvZ0FqWUNBQ0FDSUFNMkFoZ0xJQUFnQVdvZ0FUWUNBQ0FBSUFGQkFYSTJBZ1FnQUVHOEhpZ0NBRWNOQVVHd0hpQUJOZ0lBRHdzZ0JTQUNRWDV4TmdJRUlBQWdBV29nQVRZQ0FDQUFJQUZCQVhJMkFnUUxJQUZCL3dGTkJFQWdBVUVEZGlJQ1FRTjBRZEFlYWlFQkFuOUJxQjRvQWdBaUJFRUJJQUowSWdKeFJRUkFRYWdlSUFJZ0JISTJBZ0FnQVF3QkN5QUJLQUlJQ3lJQ0lBQTJBZ3dnQVNBQU5nSUlJQUFnQVRZQ0RDQUFJQUkyQWdnUEN5QUFRZ0EzQWhBZ0FFRWNhZ0ovUVFBZ0FVRUlkaUlFUlEwQUdrRWZJQUZCLy8vL0Iwc05BQm9nQkNBRVFZRCtQMnBCRUhaQkNIRWlBblFpQkNBRVFZRGdIMnBCRUhaQkJIRWlCSFFpQXlBRFFZQ0FEMnBCRUhaQkFuRWlBM1JCRDNZZ0FpQUVjaUFEY21zaUFrRUJkQ0FCSUFKQkZXcDJRUUZ4Y2tFY2Fnc2lBallDQUNBQ1FRSjBRZGdnYWlFRVFhd2VLQUlBSWdOQkFTQUNkQ0lGY1VVRVFDQUVJQUEyQWdCQnJCNGdBeUFGY2pZQ0FDQUFRUmhxSUFRMkFnQWdBQ0FBTmdJSUlBQWdBRFlDREE4TElBRkJBRUVaSUFKQkFYWnJJQUpCSDBZYmRDRUNJQVFvQWdBaEF3SkFBMEFnQXlJRUtBSUVRWGh4SUFGR0RRRWdBa0VkZGlFRElBSkJBWFFoQWlBRUlBTkJCSEZxUVJCcUlnVW9BZ0FpQXcwQUN5QUZJQUEyQWdBZ0FFRVlhaUFFTmdJQUlBQWdBRFlDRENBQUlBQTJBZ2dQQ3lBRUtBSUlJUUVnQkNBQU5nSUlJQUVnQURZQ0RDQUFRUmhxUVFBMkFnQWdBQ0FCTmdJSUlBQWdCRFlDREFzTGlRTUJCWDhDUUNBQUlBQkJmMnB4UlFSQUlBQWhBZ3dCQzBFZ0lRTURRQ0FESWdKQkFYUWhBeUFDSUFCSkRRQUxDMEZBSUFKcklBRk5CRUJCbUNKQk1EWUNBRUVBRHd0QkVDQUJRUk5xUVhCeElBRkJDMGtiSWdGQkRISWdBbW9RQVNJRFJRUkFRUUFQQ3lBRFFYaHFJUUFDUUNBQ1FYOXFJQU54UlFSQUlBQWhBZ3dCQ3lBRFFYeHFJZ1VvQWdBaUJrRjRjU0FDSUFOcVFYOXFRUUFnQW10eFFYaHFJZ01nQWlBRGFpQURJQUJyUVE5TEd5SUNJQUJySWdOcklRUWdCa0VEY1VVRVFDQUNJQVEyQWdRZ0FpQUFLQUlBSUFOcU5nSUFEQUVMSUFJZ0JDQUNLQUlFUVFGeGNrRUNjallDQkNBQ0lBUnFJZ1FnQkNnQ0JFRUJjallDQkNBRklBTWdCU2dDQUVFQmNYSkJBbkkyQWdBZ0FpQUNLQUlFUVFGeU5nSUVJQUFnQXhBRkN3SkFJQUlvQWdRaUEwRURjVVVOQUNBRFFYaHhJZ0FnQVVFUWFrME5BQ0FDSUFFZ0EwRUJjWEpCQW5JMkFnUWdBU0FDYWlJRElBQWdBV3NpQVVFRGNqWUNCQ0FBSUFKcUlnQWdBQ2dDQkVFQmNqWUNCQ0FESUFFUUJRc2dBa0VJYWdzVkFDQUFRUkJOQkVBZ0FSQUJEd3NnQUNBQkVBWUxRZ0FnQUVVRVFEOEFRUkIwRHdzQ1FDQUFRZi8vQTNFTkFDQUFRWDlNRFFBZ0FFRVFka0FBSWdCQmYwWUVRRUdZSWtFd05nSUFRWDhQQ3lBQVFSQjBEd3NBQzY4S0FRVi9Ba0FDUUNBQ1JRMEFJQUZCQTNGRkRRQURRQ0FBSUFFdEFBQTZBQUFnQWtGL2FpRURJQUJCQVdvaEFDQUJRUUZxSVFFZ0FrRUJSZzBDSUFNaEFpQUJRUU54RFFBTERBRUxJQUloQXdzQ1FDQUFRUU54SWdKRkJFQWdBMEVRVHdSQUEwQWdBQ0FCS0FJQU5nSUFJQUJCQkdvZ0FVRUVhaWdDQURZQ0FDQUFRUWhxSUFGQkNHb29BZ0EyQWdBZ0FFRU1haUFCUVF4cUtBSUFOZ0lBSUFCQkVHb2hBQ0FCUVJCcUlRRWdBMEZ3YWlJRFFROUxEUUFMQ3lBRFFRaHhCRUFnQUNBQktRSUFOd0lBSUFGQkNHb2hBU0FBUVFocUlRQUxJQU5CQkhFRVFDQUFJQUVvQWdBMkFnQWdBVUVFYWlFQklBQkJCR29oQUFzZ0EwRUNjUVJBSUFBZ0FTMEFBRG9BQUNBQUlBRXRBQUU2QUFFZ0FVRUNhaUVCSUFCQkFtb2hBQXNnQTBFQmNVVU5BU0FBSUFFdEFBQTZBQUFQQ3dKQUlBTkJJRWtOQUFKQUFrQUNRQ0FDUVg5cURnTUFBUUlEQ3lBQUlBRXRBQUU2QUFFZ0FDQUJLQUlBSWdRNkFBQWdBQ0FCTFFBQ09nQUNJQU5CZldvaEF5QUFRUU5xSVFkQkFDRUNBMEFnQWlBSGFpSUFJQUVnQW1vaUJVRUVhaWdDQUNJR1FRaDBJQVJCR0haeU5nSUFJQUJCQkdvZ0JVRUlhaWdDQUNJRVFRaDBJQVpCR0haeU5nSUFJQUJCQ0dvZ0JVRU1haWdDQUNJR1FRaDBJQVJCR0haeU5nSUFJQUJCREdvZ0JVRVFhaWdDQUNJRVFRaDBJQVpCR0haeU5nSUFJQUpCRUdvaEFpQURRWEJxSWdOQkVFc05BQXNnQWlBSGFpRUFJQUVnQW1wQkEyb2hBUXdDQ3lBQUlBRW9BZ0FpQkRvQUFDQUFJQUV0QUFFNkFBRWdBMEYrYWlFRElBQkJBbW9oQjBFQUlRSURRQ0FDSUFkcUlnQWdBU0FDYWlJRlFRUnFLQUlBSWdaQkVIUWdCRUVRZG5JMkFnQWdBRUVFYWlBRlFRaHFLQUlBSWdSQkVIUWdCa0VRZG5JMkFnQWdBRUVJYWlBRlFReHFLQUlBSWdaQkVIUWdCRUVRZG5JMkFnQWdBRUVNYWlBRlFSQnFLQUlBSWdSQkVIUWdCa0VRZG5JMkFnQWdBa0VRYWlFQ0lBTkJjR29pQTBFUlN3MEFDeUFDSUFkcUlRQWdBU0FDYWtFQ2FpRUJEQUVMSUFBZ0FTZ0NBQ0lFT2dBQUlBTkJmMm9oQXlBQVFRRnFJUWRCQUNFQ0EwQWdBaUFIYWlJQUlBRWdBbW9pQlVFRWFpZ0NBQ0lHUVJoMElBUkJDSFp5TmdJQUlBQkJCR29nQlVFSWFpZ0NBQ0lFUVJoMElBWkJDSFp5TmdJQUlBQkJDR29nQlVFTWFpZ0NBQ0lHUVJoMElBUkJDSFp5TmdJQUlBQkJER29nQlVFUWFpZ0NBQ0lFUVJoMElBWkJDSFp5TmdJQUlBSkJFR29oQWlBRFFYQnFJZ05CRWtzTkFBc2dBaUFIYWlFQUlBRWdBbXBCQVdvaEFRc2dBMEVRY1FSQUlBQWdBUzhBQURzQUFDQUFJQUV0QUFJNkFBSWdBQ0FCTFFBRE9nQURJQUFnQVMwQUJEb0FCQ0FBSUFFdEFBVTZBQVVnQUNBQkxRQUdPZ0FHSUFBZ0FTMEFCem9BQnlBQUlBRXRBQWc2QUFnZ0FDQUJMUUFKT2dBSklBQWdBUzBBQ2pvQUNpQUFJQUV0QUFzNkFBc2dBQ0FCTFFBTU9nQU1JQUFnQVMwQURUb0FEU0FBSUFFdEFBNDZBQTRnQUNBQkxRQVBPZ0FQSUFGQkVHb2hBU0FBUVJCcUlRQUxJQU5CQ0hFRVFDQUFJQUV0QUFBNkFBQWdBQ0FCTFFBQk9nQUJJQUFnQVMwQUFqb0FBaUFBSUFFdEFBTTZBQU1nQUNBQkxRQUVPZ0FFSUFBZ0FTMEFCVG9BQlNBQUlBRXRBQVk2QUFZZ0FDQUJMUUFIT2dBSElBRkJDR29oQVNBQVFRaHFJUUFMSUFOQkJIRUVRQ0FBSUFFdEFBQTZBQUFnQUNBQkxRQUJPZ0FCSUFBZ0FTMEFBam9BQWlBQUlBRXRBQU02QUFNZ0FVRUVhaUVCSUFCQkJHb2hBQXNnQTBFQ2NRUkFJQUFnQVMwQUFEb0FBQ0FBSUFFdEFBRTZBQUVnQVVFQ2FpRUJJQUJCQW1vaEFBc2dBMEVCY1VVTkFDQUFJQUV0QUFBNkFBQUxDOThDQVFKL0FrQWdBVVVOQUNBQVFRQTZBQUFnQUNBQmFpSUNRWDlxUVFBNkFBQWdBVUVEU1EwQUlBQkJBRG9BQWlBQVFRQTZBQUVnQWtGOWFrRUFPZ0FBSUFKQmZtcEJBRG9BQUNBQlFRZEpEUUFnQUVFQU9nQURJQUpCZkdwQkFEb0FBQ0FCUVFsSkRRQWdBRUVBSUFCclFRTnhJZ05xSWdKQkFEWUNBQ0FDSUFFZ0EydEJmSEVpQTJvaUFVRjhha0VBTmdJQUlBTkJDVWtOQUNBQ1FRQTJBZ2dnQWtFQU5nSUVJQUZCZUdwQkFEWUNBQ0FCUVhScVFRQTJBZ0FnQTBFWlNRMEFJQUpCQURZQ0dDQUNRUUEyQWhRZ0FrRUFOZ0lRSUFKQkFEWUNEQ0FCUVhCcVFRQTJBZ0FnQVVGc2FrRUFOZ0lBSUFGQmFHcEJBRFlDQUNBQlFXUnFRUUEyQWdBZ0F5QUNRUVJ4UVJoeUlnTnJJZ0ZCSUVrTkFDQUNJQU5xSVFJRFFDQUNRZ0EzQXdBZ0FrRVlha0lBTndNQUlBSkJFR3BDQURjREFDQUNRUWhxUWdBM0F3QWdBa0VnYWlFQ0lBRkJZR29pQVVFZlN3MEFDd3NMVHdFQmZDQUFJQUNpSWdCRWdWNE0vZi8vMzcraVJBQUFBQUFBQVBBL29DQUFJQUNpSWdGRVFqb0Y0Vk5WcFQraW9DQUFJQUdpSUFCRWFWRHU0RUtUK1Q2aVJDY2VEK2lId0ZhL29LS2d0Z3RMQVFKOElBQWdBS0lpQVNBQW9pSUNJQUVnQWFLaUlBRkVwMFk3aklmTnhqNmlSSFRueXVMNUFDcS9vS0lnQWlBQlJMTDdib2tRRVlFL29rUjNyTXRVVlZYRnY2Q2lJQUNnb0xZTHFBRUFBa0FnQVVHQUNFNEVRQ0FBUkFBQUFBQUFBT0Ivb2lFQUlBRkIvdzlJQkVBZ0FVR0JlR29oQVF3Q0N5QUFSQUFBQUFBQUFPQi9vaUVBSUFGQi9SY2dBVUg5RjBnYlFZSndhaUVCREFFTElBRkJnWGhLRFFBZ0FFUUFBQUFBQUFCZ0E2SWhBQ0FCUWJod1NnUkFJQUZCeVFkcUlRRU1BUXNnQUVRQUFBQUFBQUJnQTZJaEFDQUJRZkJvSUFGQjhHaEtHMEdTRDJvaEFRc2dBQ0FCUWY4SGFxMUNOSWEvb2d2UERnSVRmd0o4SXdCQnNBUnJJZ1VrQUNBQ1FYMXFRUmh0SWdSQkFDQUVRUUJLR3lJT1FXaHNJQUpxSVFsQmdBZ29BZ0FpQ2tFQVRnUkFJQXBCQVdvaEJ5QU9JZ0pCQW5SQmtBaHFJUVlnQlVIQUFtb2hCQU5BSUFRZ0FrRUFTQVI4UkFBQUFBQUFBQUFBQlNBR0tBSUF0d3M1QXdBZ0JFRUlhaUVFSUFaQkJHb2hCaUFDUVFGcUlRSWdCMEYvYWlJSERRQUxDeUFKUVdocUlRc2dDa0VBSUFwQkFFb2JJUWdnQlVIQUFtb2hCd05BUkFBQUFBQUFBQUFBSVJZZ0FDRUNRUUVoQmlBSElRUURRQ0FXSUFJckF3QWdCQ3NEQUtLZ0lSWWdBa0VJYWlFQ0lBUkJlR29oQkNBR1FYOXFJZ1lOQUFzZ0JTQURRUU4wYWlBV09RTUFJQWRCQ0dvaEJ5QURJQWhHSVFJZ0EwRUJhaUVESUFKRkRRQUxRUzhnQ1dzaEVFRXdJQWxySVE4Z0NrRUNkQ0FGYWtIY0Eyb2hFU0FGUWR3RGFpRVNJQVZCZUdvaEV5QUpRV2RxSVJRZ0NpRURBa0FEUUNBRklBTkJBM1FpQW1vckF3QWhGaUFEUVFGSUlnaEZCRUFnQWlBVGFpRUNJQVZCNEFOcUlRUWdBeUVHQTBBZ0JBSi9JQllDZnlBV1JBQUFBQUFBQUhBK29pSVhtVVFBQUFBQUFBRGdRV01FUUNBWHFnd0JDMEdBZ0lDQWVBdTNJaGRFQUFBQUFBQUFjTUdpb0NJV21VUUFBQUFBQUFEZ1FXTUVRQ0FXcWd3QkMwR0FnSUNBZUFzMkFnQWdCRUVFYWlFRUlBSXJBd0FnRjZBaEZpQUNRWGhxSVFJZ0JrRi9haUlHRFFBTEN3Si9JQllnQ3hBTkloWWdGa1FBQUFBQUFBREFQNktjUkFBQUFBQUFBQ0RBb3FBaUZwbEVBQUFBQUFBQTRFRmpCRUFnRnFvTUFRdEJnSUNBZ0hnTElRd2dGaUFNdDZFaEZnSkFBa0FDUUFKL0lBdEJBVWdpRlVVRVFDQURRUUowSUFWcVFkd0RhaUlDSUFJb0FnQWlBaUFDSUE5MUlnSWdEM1JySWdRMkFnQWdBaUFNYWlFTUlBUWdFSFVNQVFzZ0N3MEJJQU5CQW5RZ0JXcEIzQU5xS0FJQVFSZDFDeUlOUVFGSURRSU1BUXRCQWlFTklCWkVBQUFBQUFBQTREOW1RUUZ6UlEwQVFRQWhEUXdCQ3dKQUlBZ0VRRUVBSVFjTUFRdEJBQ0VISUFWQjRBTnFJUUlnQXlFSUEwQWdBaWdDQUNFRVFmLy8vd2NoQmdKL0FrQWdCdzBBUVlDQWdBZ2hCaUFFRFFCQkFBd0JDeUFDSUFZZ0JHczJBZ0JCQVFzaEJ5QUNRUVJxSVFJZ0NFRi9haUlJRFFBTEN3SkFJQlVOQUFKQUFrQWdGQTRDQUFFQ0N5QURRUUowSUFWcVFkd0RhaUlDSUFJb0FnQkIvLy8vQTNFMkFnQU1BUXNnQTBFQ2RDQUZha0hjQTJvaUFpQUNLQUlBUWYvLy93RnhOZ0lBQ3lBTVFRRnFJUXdnRFVFQ1J3MEFSQUFBQUFBQUFQQS9JQmFoSVJaQkFpRU5JQWRGRFFBZ0ZrUUFBQUFBQUFEd1B5QUxFQTJoSVJZTElCWkVBQUFBQUFBQUFBQmhCRUFDUUNBRElBcE1EUUFnRWlBRFFRSjBhaUVDUVFBaEJDQURJUVlEUUNBQ0tBSUFJQVJ5SVFRZ0FrRjhhaUVDSUFaQmYyb2lCaUFLU2cwQUN5QUVSUTBBSUFOQkFuUWdCV3BCM0FOcUlRSWdDeUVKQTBBZ0EwRi9haUVESUFsQmFHb2hDU0FDS0FJQUlRUWdBa0Y4YWlFQ0lBUkZEUUFMREFNTElCRWhBaUFESVFjRFFDQUhRUUZxSVFjZ0FpZ0NBQ0VFSUFKQmZHb2hBaUFFUlEwQUN5QURRUU4wSUFWcVFjZ0NhaUVJQTBBZ0EwRURkQ0FGYWtISUFtb2dBMEVCYWlJRElBNXFRUUowUVpBSWFpZ0NBTGM1QXdCRUFBQUFBQUFBQUFBaEZpQUFJUUlnQ0NFRVFRRWhCZ05BSUJZZ0Fpc0RBQ0FFS3dNQW9xQWhGaUFDUVFocUlRSWdCRUY0YWlFRUlBWkJmMm9pQmcwQUN5QUZJQU5CQTNScUlCWTVBd0FnQ0VFSWFpRUlJQU1nQjBnTkFBc2dCeUVEREFFTEN3SkFJQlpCQUNBTGF4QU5JaFpFQUFBQUFBQUFjRUZtUVFGelJRUkFJQVZCNEFOcUlBTkJBblJxQW44Z0ZnSi9JQlpFQUFBQUFBQUFjRDZpSWhlWlJBQUFBQUFBQU9CQll3UkFJQmVxREFFTFFZQ0FnSUI0Q3lJQ3QwUUFBQUFBQUFCd3dhS2dJaGFaUkFBQUFBQUFBT0JCWXdSQUlCYXFEQUVMUVlDQWdJQjRDellDQUNBRFFRRnFJUU1NQVFzQ2Z5QVdtVVFBQUFBQUFBRGdRV01FUUNBV3Fnd0JDMEdBZ0lDQWVBc2hBaUFMSVFrTElBVkI0QU5xSUFOQkFuUnFJQUkyQWdBTEFrQWdBMEVBU0EwQUlBTkJBV29oQmlBRlFlQURhaUFEUVFKMGFpRUNJQVVnQTBFRGRHb2hCRVFBQUFBQUFBRHdQeUFKRUEwaEZnTkFJQVFnRmlBQ0tBSUF0Nkk1QXdBZ0FrRjhhaUVDSUFSQmVHb2hCQ0FXUkFBQUFBQUFBSEErb2lFV0lBWkJmMm9pQmtFQVNnMEFDMEVBSVFjZ0EwRUFTQTBBSUFwQkFDQUtRUUJLR3lFSUlBVWdBMEVEZEdvaEJpQURJUUFEUUNBRElBQnJJUTRnQ0NBSElBZ2dCMGtiUVFGcUlRUkVBQUFBQUFBQUFBQWhGa0VBSVFJRFFDQVdJQUpCNEIxcUt3TUFJQUlnQm1vckF3Q2lvQ0VXSUFKQkNHb2hBaUFFUVg5cUlnUU5BQXNnQlVHZ0FXb2dEa0VEZEdvZ0Zqa0RBQ0FHUVhocUlRWWdBRUYvYWlFQUlBTWdCMGNoQWlBSFFRRnFJUWNnQWcwQUN3c0NRQ0FEUVFCSUJFQkVBQUFBQUFBQUFBQWhGZ3dCQ3lBRFFRRnFJUVFnQlVHZ0FXb2dBMEVEZEdvaEFrUUFBQUFBQUFBQUFDRVdBMEFnRmlBQ0t3TUFvQ0VXSUFKQmVHb2hBaUFFUVg5cUlnUkJBRW9OQUFzTElBRWdGcG9nRmlBTkd6a0RBQ0FGUWJBRWFpUUFJQXhCQjNFTGdRSUNBMzhCZkNNQVFSQnJJZ01rQUFKQUlBQzhJZ1JCLy8vLy93ZHhJZ0pCMnArazdnUk5CRUFnQVNBQXV5SUZJQVZFZzhqSmJUQmY1RCtpUkFBQUFBQUFBRGhEb0VRQUFBQUFBQUE0dzZBaUJVUUFBQUJRK3lINXY2S2dJQVZFWTJJYVliUVFVYjZpb0RrREFDQUZtVVFBQUFBQUFBRGdRV01FUUNBRnFpRUNEQUlMUVlDQWdJQjRJUUlNQVFzZ0FrR0FnSUQ4QjA4RVFDQUJJQUFnQUpPN09RTUFRUUFoQWd3QkN5QURJQUlnQWtFWGRrSHFmbW9pQWtFWGRHdSt1emtEQ0NBRFFRaHFJQU1nQWhBT0lRSWdBeXNEQUNFRklBUkJmMHdFUUNBQklBV2FPUU1BUVFBZ0Ftc2hBZ3dCQ3lBQklBVTVBd0FMSUFOQkVHb2tBQ0FDQytjQ0FnTi9BWHdqQUVFUWF5SUJKQUFDZlNBQXZDSURRZi8vLy84SGNTSUNRZHFmcFBvRFRRUkFRd0FBZ0Q4Z0FrR0FnSURNQTBrTkFSb2dBTHNRQ3d3QkN5QUNRZEduN1lNRVRRUkFJQUM3SVFRZ0FrSGtsOXVBQkU4RVFFUVlMVVJVK3lFSndFUVlMVVJVK3lFSlFDQURRWDlLR3lBRW9CQUxqQXdDQ3lBRFFYOU1CRUFnQkVRWUxVUlUreUg1UDZBUURBd0NDMFFZTFVSVSt5SDVQeUFFb1JBTURBRUxJQUpCMWVPSWh3Uk5CRUFnQWtIZzI3K0ZCRThFUUVRWUxVUlUreUVad0VRWUxVUlUreUVaUUNBRFFYOUtHeUFBdTZBUUN3d0NDeUFEUVg5TUJFQkUwaUV6ZjN6WkVzQWdBTHVoRUF3TUFnc2dBTHRFMGlFemYzelpFc0NnRUF3TUFRc2dBQ0FBa3lBQ1FZQ0FnUHdIVHcwQUdnSkFBa0FDUUFKQUlBQWdBVUVJYWhBUFFRTnhEZ01BQVFJREN5QUJLd01JRUFzTUF3c2dBU3NEQ0pvUURBd0NDeUFCS3dNSUVBdU1EQUVMSUFFckF3Z1FEQXNoQUNBQlFSQnFKQUFnQUF2OUFnSURmd0Y4SXdCQkVHc2lBU1FBQWtBZ0FMd2lBMEgvLy8vL0IzRWlBa0hhbjZUNkEwMEVRQ0FDUVlDQWdNd0RTUTBCSUFDN0VBd2hBQXdCQ3lBQ1FkR243WU1FVFFSQUlBQzdJUVFnQWtIamw5dUFCRTBFUUNBRFFYOU1CRUFnQkVRWUxVUlUreUg1UDZBUUM0d2hBQXdEQ3lBRVJCZ3RSRlQ3SWZtL29CQUxJUUFNQWd0RUdDMUVWUHNoQ2NCRUdDMUVWUHNoQ1VBZ0EwRi9TaHNnQktDYUVBd2hBQXdCQ3lBQ1FkWGppSWNFVFFSQUlBQzdJUVFnQWtIZjI3K0ZCRTBFUUNBRFFYOU1CRUFnQkVUU0lUTi9mTmtTUUtBUUN5RUFEQU1MSUFSRTBpRXpmM3paRXNDZ0VBdU1JUUFNQWd0RUdDMUVWUHNoR2NCRUdDMUVWUHNoR1VBZ0EwRi9TaHNnQktBUURDRUFEQUVMSUFKQmdJQ0EvQWRQQkVBZ0FDQUFreUVBREFFTEFrQUNRQUpBQWtBZ0FDQUJRUWhxRUE5QkEzRU9Bd0FCQWdNTElBRXJBd2dRRENFQURBTUxJQUVyQXdnUUN5RUFEQUlMSUFFckF3aWFFQXdoQUF3QkN5QUJLd01JRUF1TUlRQUxJQUZCRUdva0FDQUFDNmNEQVFSL0FrQWdBQ0FCUmcwQUlBRWdBR3NnQW10QkFDQUNRUUYwYTAwRVFDQUFJQUVnQWhBSkRBRUxJQUFnQVhOQkEzRWhBd0pBQWtBZ0FDQUJTUVJBSUFNRVFDQUFJUU1NQXdzZ0FFRURjVVVFUUNBQUlRTU1BZ3NnQUNFREEwQWdBa1VOQkNBRElBRXRBQUE2QUFBZ0FVRUJhaUVCSUFKQmYyb2hBaUFEUVFGcUlnTkJBM0VOQUFzTUFRc0NRQ0FEQkVBZ0FpRUREQUVMQWtBZ0FDQUNha0VEY1VVRVFDQUNJUU1NQVFzZ0FVRi9haUVGSUFCQmYyb2hCZ05BSUFKRkRRVWdBaUFHYWlJRUlBSWdCV290QUFBNkFBQWdBa0YvYWlJRElRSWdCRUVEY1EwQUN3c2dBMEVFU1EwQUlBQkJmR29oQWlBQlFYeHFJUVFEUUNBQ0lBTnFJQU1nQkdvb0FnQTJBZ0FnQTBGOGFpSURRUU5MRFFBTEN5QURSUTBDSUFGQmYyb2hBU0FBUVg5cUlRSURRQ0FDSUFOcUlBRWdBMm90QUFBNkFBQWdBMEYvYWlJRERRQUxEQUlMSUFKQkJFa05BQU5BSUFNZ0FTZ0NBRFlDQUNBQlFRUnFJUUVnQTBFRWFpRURJQUpCZkdvaUFrRURTdzBBQ3dzZ0FrVU5BQU5BSUFNZ0FTMEFBRG9BQUNBRFFRRnFJUU1nQVVFQmFpRUJJQUpCZjJvaUFnMEFDd3NMbWdRREJYOEVmUU44SUFOQkFEWUNBRUdUemdBaEJRSkFJQUFnQVVnTkFDQUNRUUZJRFFCQmtjNEFJUVZCQVVFb0VBUWlCRVVOQUNBRUlBRTJBZ3dnQkNBQ1FRRjBJZ2MyQWdBZ0JDQUFzaUFCc3BVaUNUZ0NCQ0FFSUFKQkEzUVFBU0lHTmdJSUFuOGdDWTBpQ290REFBQUFUMTBFUUNBS3FBd0JDMEdBZ0lDQWVBc2hDQ0FHUlFSQUlBUVFBMEdSemdBUEMwRUFJQUpySVFFZ0FrRUJkQ0VBUXdBQUFEOGdDWlc3UkJndFJGVDdJUmxBb2lJUHRpRUxJQWUzSVE1REFBQUFBQ0VLSUFZaEJRTkFJQXNoQ1NBQkJFQWdEVVFZTFVSVSt5RXBRS0lnRHFPMkVCQWhDU0FOUkJndFJGVDdJUmxBb2lBT283WVFFQ0VNSUE4Z0FiZWl0aEFSSUFHeWxTQUpRd3JYb3oyVUlBeERBQUFBdjVSRFBRclhQcEtTbENFSkN5QUZJQWs0QWdBZ0FVRUJhaUVCSUFWQkJHb2hCU0FOUkFBQUFBQUFBUEEvb0NFTklBb2dDWkloQ2lBQVFYOXFJZ0FOQUFzZ0FrRUJkQ0VGSUFZaEFRTkFJQUVnQVNvQ0FDQUtsVGdDQUNBQlFRUnFJUUVnQlVGL2FpSUZEUUFMSUFRZ0NFR0FFR29pQlVFQ0VBUWlBVFlDSENBQlJRUkFJQVlRQXlBRUtBSWNJZ0VFUUNBQkVBTUxJQVFvQWlBaUFRUkFJQUVRQXdzZ0JCQURRWkhPQUE4TElBUWdCU0FIYWtFQ0VBUWlBVFlDSUNBQlJRUkFJQVlRQXlBRUtBSWNJZ0VFUUNBQkVBTUxJQVFvQWlBaUFRUkFJQUVRQXdzZ0JCQURRWkhPQUE4TElBTWdCRFlDQUNBRVFnRTNBeEJCa000QUlRVUxJQVVMTndFQmZ5QUFCRUFnQUNnQ0NDSUJCRUFnQVJBREN5QUFLQUljSWdFRVFDQUJFQU1MSUFBb0FpQWlBUVJBSUFFUUF3c2dBQkFEQ3d2WkJnUU9md04rQTMwRGZBSkFJQUFxQWdRaUZVTUFBSUEvWGtFQmMwVUVRQ0FDUVFGSUJFQkJBQThMSUFBb0FnQWhCQ0FBS0FJWUlRVUNmaUFWdXlBQUtRTVFRbjk4dWFLYlJBQUFBQUFBQVBDL29DSVltVVFBQUFBQUFBRGdRMk1FUUNBWXNBd0JDMEtBZ0lDQWdJQ0FnSUIvQ3lFU0lBUWdCV29oQkFOQUlBQW9BaUFnQkVFQmRHb2dBU0FDUVlBUUlBUnJJZ1VnQWlBRlNCc2lEVUVCZENJUUVBa2dBQ2dDSENFSklBQW9BaUFoQ2tFQUlRZ2dCQ0FOYWlJT0lBQW9BZ0FpQjBvRVFDQUFLQUlJSVJFZ0RpQUhheUVJSUFvZ0IwRUJkR29oQzBFQUlRd0RRRU1BQUFBQUlSVWdDU0FNUVFGMGFnSi9JQWRCQVU0RVFDQUxJUVFnRVNFRklBY2hEd05BSUJVZ0JTb0NBQ0FFTGdFQXNwU1NJUlVnQkVGK2FpRUVJQVZCQkdvaEJTQVBRWDlxSWc4TkFBdEIvLzhCSUJWREFQNy9SbUFOQVJwQmdJQUNJQlZEQUFBQXgxOE5BUm9MSUJXTFF3QUFBRTlkQkVBZ0ZhZ01BUXRCZ0lDQWdIZ0xPd0VBSUF0QkFtb2hDeUFNUVFGcUlnd2dDRWNOQUFzTElCSkNBWHdoRXdKK0lBQXBBeEFpRXJrZ0FDb0NCTHNpR0tLYlJBQUFBQUFBQVBDL29DSVptVVFBQUFBQUFBRGdRMk1FUUNBWnNBd0JDMEtBZ0lDQWdJQ0FnSUIvQ3lBVGZTQUlRWDlxckNJVVV3UkFJQU1nQmtFQmRHb2hCQ0FUdVNFYUEwQUNmeUFZSUJLNW9pQWFvYllpRlk0aUZvdERBQUFBVDEwRVFDQVdxQXdCQzBHQWdJQ0FlQXNoQlNBVklCYVRJUmNnQ1NBRlFRRjBhaTRCQUxJaEZpQUVBbjhnRnlBSkFuOGdGWTBpRll0REFBQUFUMTBFUUNBVnFBd0JDMEdBZ0lDQWVBdEJBWFJxTGdFQXNpQVdrNVFnRnBJaUZZdERBQUFBVDEwRVFDQVZxQXdCQzBHQWdJQ0FlQXM3QVFBZ0JFRUNhaUVFSUFaQkFXb2hCZ0orSUJnZ0VrSUJmQ0lTdWFLYlJBQUFBQUFBQVBDL29DSVptVVFBQUFBQUFBRGdRMk1FUUNBWnNBd0JDMEtBZ0lDQWdJQ0FnSUIvQ3lBVGZTQVVVdzBBQ3lBQUlCSTNBeEFMSUFBZ0NBSitJQmdnRWtKL2ZMbWltMFFBQUFBQUFBRHd2NkFpR0psRUFBQUFBQUFBNEVOakJFQWdHTEFNQVF0Q2dJQ0FnSUNBZ0lDQWZ3c2lFaUFUZmFkQmYzTnFJZ1EyQWhnZ0NpQUtJQTRnQkNBSGFpSUVhMEVCZEdvZ0JFRUJkQkFTSUFFZ0VHb2hBU0FDSUExcklnSkJBRW9OQUFzTUFRc2dBeUFCSUFKQkFYUVFDU0FDSVFZTElBWUxMZ0VCZlFKL0lBQXFBZ1FnQWJLVWpTSUNpME1BQUFCUFhRUkFJQUtvREFFTFFZQ0FnSUI0Q3lBQUtBSVlhd3N3QVFGOUFuOGdBQ2dDR0NBQmFySWdBQ29DQkpVaUFvdERBQUFBVDEwRVFDQUNxQXdCQzBHQWdJQ0FlQXRCZjJvTFJnRUJmU0FBS0FJZ0FuOGdBQ29DQkkwaUFZdERBQUFBVDEwRVFDQUJxQXdCQzBHQWdJQ0FlQXNnQUNnQ0FHcEJBWFJCZ0NCcUVBb2dBRUlCTndNUUlBQkJBRFlDR0FzRkFFR2dIZ3NMcHhZQ0FFR0FDQXZYRlFNQUFBQUVBQUFBQkFBQUFBWUFBQUNEK2FJQVJFNXVBUHdwRlFEUlZ5Y0EzVFQxQUdMYndBQThtWlVBUVpCREFHTlIvZ0M3M3FzQXQySEZBRHB1SkFEU1RVSUFTUWJnQUFucUxnQWNrdEVBNngzK0FDbXhIQURvUHFjQTlUV0NBRVM3TGdDYzZZUUF0Q1p3QUVGK1h3RFdrVGtBVTRNNUFKejBPUUNMWDRRQUtQbTlBUGdmT3dEZS81Y0FENWdGQUJFdjd3QUtXb3NBYlI5dEFNOStOZ0FKeXljQVJrKzNBSjVtUHdBdDZsOEF1aWQxQU9Ycnh3QTllL0VBOXprSEFKSlNpZ0Q3YStvQUg3RmZBQWhkalFBd0ExWUFlL3hHQVBDcmF3QWd2TThBTnZTYUFPT3BIUUJlWVpFQUNCdm1BSVdaWlFDZ0ZGOEFqVUJvQUlEWS93QW5jMDBBQmdZeEFNcFdGUURKcUhNQWUrSmdBR3VNd0FBWnhFY0F6V2ZEQUFubzNBQlpneW9BaTNiRUFLWWNsZ0JFcjkwQUdWZlJBS1UrQlFBRkIvOEFNMzQvQU1JeTZBQ1lUOTRBdTMweUFDWTl3d0FlYSs4QW4vaGVBRFVmT2dCLzhzb0E4WWNkQUh5UUlRQnFKSHdBMVc3NkFEQXRkd0FWTzBNQXRSVEdBTU1ablFDdHhNSUFMRTFCQUF3QVhRQ0dmVVlBNDNFdEFKdkdtZ0F6WWdBQXROSjhBTFNubHdBM1ZkVUExejcyQUtNUUdBQk5kdndBWkowcUFIRFhxd0JqZlBnQWVyQlhBQmNWNXdEQVNWWUFPOWJaQUtlRU9BQWtJOHNBMW9wM0FGcFVJd0FBSDdrQThRb2JBQm5PM3dDZk1mOEFaaDVxQUpsWFlRQ3MrMGNBZm4vWUFDSmx0d0F5NklrQTVyOWdBTy9FelFCc05na0FYVC9VQUJiZTF3QllPOTRBM3B1U0FOSWlLQUFvaHVnQTRsaE5BTWJLTWdBSTR4WUE0SDNMQUJmQVVBRHpIYWNBR09CYkFDNFROQUNERW1JQWcwZ0JBUFdPV3dDdHNIOEFIdW55QUVoS1F3QVFaOU1BcXQzWUFLNWZRZ0JxWWM0QUNpaWtBTk9adEFBR3B2SUFYSGQvQUtQQ2d3QmhQSWdBaW5ONEFLK01XZ0J2MTcwQUxhWmpBUFMveXdDTmdlOEFKc0ZuQUZYS1JRREsyVFlBS0tqU0FNSmhqUUFTeVhjQUJDWVVBQkpHbXdERVdjUUF5TVZFQUUyeWtRQUFGL01BMUVPdEFDbEo1UUQ5MVJBQUFMNzhBQjZVekFCd3p1NEFFejcxQU96eGdBQ3o1OE1BeC9nb0FKTUZsQURCY1Q0QUxnbXpBQXRGOHdDSUVwd0FxeUI3QUM2MW53Qkhrc0lBZXpJdkFBeFZiUUJ5cDVBQWErY2ZBREhMbGdCNUZrb0FRWG5pQVBUZmlRRG9sSmNBNHVhRUFKa3hsd0NJN1dzQVgxODJBTHY5RGdCSW1yUUFaNlJzQUhGeVFnQ05YVElBbnhXNEFMemxDUUNOTVNVQTkzUTVBREFGSEFBTkRBRUFTd2hvQUN6dVdBQkhxcEFBZE9jQ0FMM1dKQUQzZmFZQWJraHlBSjhXN3dDT2xLWUF0SkgyQU5GVFVRRFBDdklBSUpnekFQVkxmZ0N5WTJnQTNUNWZBRUJkQXdDRmlYOEFWVklwQURka3dBQnQyQkFBTWtneUFGdE1kUUJPY2RRQVJWUnVBQXNKd1FBcTlXa0FGR2JWQUNjSG5RQmRCRkFBdER2YkFPcDJ4UUNIK1JjQVNXdDlBQjBudWdDV2FTa0F4c3lzQUswVVZBQ1E0bW9BaU5tSkFDeHlVQUFFcEw0QWR3ZVVBUE13Y0FBQS9DY0E2bkdvQUdiQ1NRQms0RDBBbDkyREFLTS9sd0JEbFAwQURZYU1BREZCM2dDU09aMEEzWENNQUJlMzV3QUkzenNBRlRjckFGeUFvQUJhZ0pNQUVCR1NBQS9vMkFCc2dLOEEyLzlMQURpUUR3QlpHSFlBWXFVVkFHSEx1d0RIaWJrQUVFQzlBTkx5QkFCSmRTY0E2N2IyQU5zaXV3QUtGS29BaVNZdkFHU0RkZ0FKT3pNQURwUWFBRkU2cWdBZG84SUFyKzJ1QUZ3bUVnQnR3azBBTFhxY0FNQldsd0FEUDRNQUNmRDJBQ3RBakFCdE1aa0FPYlFIQUF3Z0ZRRFl3MXNBOVpMRUFNYXRTd0JPeXFVQXB6Zk5BT2FwTmdDcmtwUUEzVUpvQUJsajNnQjJqTzhBYUl0U0FQemJOd0N1b2FzQTN4VXhBQUN1b1FBTSs5b0FaRTFtQU8wRnR3QXBaVEFBVjFhL0FFZi9PZ0JxK2JrQWRiN3pBQ2lUM3dDcmdEQUFab3oyQUFUTEZRRDZJZ1lBMmVRZEFEMnpwQUJYRzQ4QU5zMEpBRTVDNlFBVHZxUUFNeU8xQVBDcUdnQlBaYWdBMHNHbEFBcy9Ed0JiZU0wQUkvbDJBSHVMQkFDSkYzSUF4cVpUQUc5dTRnRHY2d0FBbTBwWUFNVGF0d0NxWnJvQWRzL1BBTkVDSFFDeDhTMEFqSm5CQU1PdGR3Q0dTTm9BOTEyZ0FNYUE5QUNzOEM4QTNleWFBRDljdkFEUTNtMEFrTWNmQUNyYnRnQ2pKVG9BQUsrYUFLMVRrd0MyVndRQUtTMjBBRXVBZmdEYUI2Y0FkcW9PQUh0Wm9RQVdFaW9BM0xjdEFQcmwvUUNKMi80QWliNzlBT1IyYkFBR3Fmd0FQb0J3QUlWdUZRRDloLzhBS0Q0SEFHRm5Nd0FxR0lZQVRiM3FBTFBucndDUGJXNEFsV2M1QURHL1d3Q0UxMGdBTU44V0FNY3RRd0FsWVRVQXlYRE9BRERMdUFDL2JQMEFwQUNpQUFWczVBQmEzYUFBSVc5SEFHSVMwZ0M1WElRQWNHRkpBR3RXNEFDWlVnRUFVRlUzQUI3VnR3QXo4Y1FBRTI1ZkFGMHc1QUNGTHFrQUhiTERBS0V5TmdBSXQ2UUE2ckhVQUJiM0lRQ1BhZVFBSi85M0FBd0RnQUNOUUMwQVQ4MmdBQ0NsbVFDem90TUFMMTBLQUxUNVFnQVIyc3NBZmI3UUFKdmJ3UUNyRjcwQXlxS0JBQWhxWEFBdVZSY0FKd0JWQUg4VThBRGhCNFlBRkF0a0FKWkJqUUNIdnQ0QTJ2MHFBR3NsdGdCN2lUUUFCZlArQUxtL25nQm9hazhBU2lxb0FFL0VXZ0F0K0x3QTExcVlBUFRIbFFBTlRZMEFJRHFtQUtSWFh3QVVQN0VBZ0RpVkFNd2dBUUJ4M1lZQXlkNjJBTDlnOVFCTlpSRUFBUWRyQUl5d3JBQ3l3TkFBVVZWSUFCNzdEZ0NWY3NNQW93WTdBTUJBTlFBRzNIc0E0RVhNQUU0cCtnRFd5c2dBNlBOQkFIeGszZ0NiWk5nQTJiNHhBS1NYd3dCM1dOUUFhZVBGQVBEYUV3QzZPandBUmhoR0FGVjFYd0RTdmZVQWJwTEdBS3d1WFFBT1JPMEFIRDVDQUdIRWh3QXAvZWtBNTliekFDSjh5Z0J2a1RVQUNPREZBUC9YalFCdWF1SUFzUDNHQUpNSXdRQjhYWFFBYTYyeUFNMXVuUUErY25zQXhoRnFBUGZQcVFBcGM5OEF0Y202QUxjQVVRRGlzZzBBZExva0FPVjlZQUIwMklvQURSVXNBSUVZREFCK1pwUUFBU2tXQUo5NmRnRDkvYjRBVmtYdkFObCtOZ0RzMlJNQWk3cTVBTVNYL0FBeHFDY0E4VzdEQUpURk5nRFlxRllBdEtpMUFNL01EZ0FTaVMwQWIxYzBBQ3hXaVFDWnp1TUExaUM1QUd0ZXFnQStLcHdBRVYvTUFQMExTZ0RoOVBzQWpqdHRBT0tHTEFEcDFJUUEvTFNwQU8vdTBRQXVOY2tBTHpsaEFEZ2hSQUFiMmNnQWdmd0tBUHRLYWdBdkhOZ0FVN1NFQUU2WmpBQlVJc3dBS2xYY0FNREcxZ0FMR1pZQUduQzRBR21WWkFBbVdtQUFQMUx1QUg4UkR3RDB0UkVBL012MUFEUzhMUUEwdk80QTZGM01BTjFlWUFCbmpwc0FralB2QU1rWHVBQmhXSnNBNFZlOEFGR0R4Z0RZUGhBQTNYRklBQzBjM1FDdkdLRUFJU3hHQUZuejF3RFplcGdBbmxUQUFFK0crZ0JXQnZ3QTVYbXVBSWtpTmdBNHJTSUFaNVBjQUZYb3FnQ0NKamdBeXVlYkFGRU5wQUNaTTdFQXFkY09BR2tGU0FCbHN2QUFmNGluQUloTWx3RDUwVFlBSVpLekFIdUNTZ0NZenlFQVFKL2NBTnhIVlFEaGREb0FaK3RDQVA2ZDN3QmUxRjhBZTJla0FMcXNlZ0JWOXFJQUs0Z2pBRUc2VlFCWmJnZ0FJU3FHQURsSGd3Q0o0K1lBNVo3VUFFbjdRQUQvVnVrQUhBL0tBTVZaaWdDVStpc0EwOEhGQUEvRnp3RGJXcTRBUjhXR0FJVkRZZ0FoaGpzQUxIbVVBQkJoaHdBcVRIc0FnQ3dhQUVPL0VnQ0lKcEFBZUR5SkFLakU1QURsMjNzQXhEckNBQ2IwNmdEM1o0b0FEWksvQUdXakt3QTlrN0VBdlh3TEFLUlIzQUFuM1dNQWFlSGRBSnFVR1FDb0taVUFhTTRvQUFudHRBQkVueUFBVHBqS0FIQ0NZd0IrZkNNQUQ3a3lBS2YxamdBVVZ1Y0FJZkVJQUxXZEtnQnZmazBBcFJsUkFMWDVxd0NDMzlZQWx0MWhBQlkyQWdERU9wOEFnNktoQUhMdGJRQTVqWG9BZ3JpcEFHc3lYQUJHSjFzQUFEVHRBTklBZHdEODlGVUFBVmxOQU9CeGdBQkI0eDBMUWtEN0lmay9BQUFBQUMxRWRENEFBQUNBbUViNFBBQUFBR0JSekhnN0FBQUFnSU1iOERrQUFBQkFJQ1Y2T0FBQUFJQWlndU0yQUFBQUFCM3phVFV4TGpBdU1BPT0nOwoKICBmdW5jdGlvbiBhcnJheUJ1ZmZlclRvU3RyaW5nQXRJbmRleChhcnJheUJ1ZmZlciwgaW5kZXhTdGFydCkgewogICAgdmFyIGluZGV4RW5kID0gaW5kZXhTdGFydDsKCiAgICB3aGlsZSAoYXJyYXlCdWZmZXJbaW5kZXhFbmRdICE9PSAwKSB7CiAgICAgIGluZGV4RW5kKys7CiAgICB9CgogICAgdmFyIHV0ZjhkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcpOwogICAgcmV0dXJuIHV0ZjhkZWNvZGVyLmRlY29kZShhcnJheUJ1ZmZlci5zdWJhcnJheShpbmRleFN0YXJ0LCBpbmRleEVuZCkpOwogIH0KICBmdW5jdGlvbiBiYXNlNjRUb1VpbnQ4QXJyYXkoYmFzZTY0U3RyaW5nKSB7CiAgICB2YXIgYmFzZTY0U3RyaW5nRGVjb2RlZCA9IGF0b2IoYmFzZTY0U3RyaW5nKTsKICAgIHZhciBiaW5hcnlBcnJheSA9IG5ldyBVaW50OEFycmF5KGJhc2U2NFN0cmluZ0RlY29kZWQubGVuZ3RoKTsKCiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2U2NFN0cmluZ0RlY29kZWQubGVuZ3RoOyBpKyspIHsKICAgICAgYmluYXJ5QXJyYXlbaV0gPSBiYXNlNjRTdHJpbmdEZWNvZGVkLmNoYXJDb2RlQXQoaSk7CiAgICB9CgogICAgcmV0dXJuIGJpbmFyeUFycmF5OwogIH0KCiAgdmFyIHdhc2lTbmFwc2hvdFByZXZpZXcxRW11bGF0b3IgPSB7CiAgICBhcmdzX2dldDogZnVuY3Rpb24gYXJnc19nZXQoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgYXJnc19zaXplc19nZXQ6IGZ1bmN0aW9uIGFyZ3Nfc2l6ZXNfZ2V0KGlucHV0KSB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGVudmlyb25fZ2V0OiBmdW5jdGlvbiBlbnZpcm9uX2dldChpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBlbnZpcm9uX3NpemVzX2dldDogZnVuY3Rpb24gZW52aXJvbl9zaXplc19nZXQoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgY2xvY2tfcmVzX2dldDogZnVuY3Rpb24gY2xvY2tfcmVzX2dldChpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBjbG9ja190aW1lX2dldDogZnVuY3Rpb24gY2xvY2tfdGltZV9nZXQoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfYWR2aXNlOiBmdW5jdGlvbiBmZF9hZHZpc2UoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfYWxsb2NhdGU6IGZ1bmN0aW9uIGZkX2FsbG9jYXRlKGlucHV0KSB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX2Nsb3NlOiBmdW5jdGlvbiBmZF9jbG9zZShpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9kYXRhc3luYzogZnVuY3Rpb24gZmRfZGF0YXN5bmMoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfZmRzdGF0X2dldDogZnVuY3Rpb24gZmRfZmRzdGF0X2dldChpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9mZHN0YXRfc2V0X2ZsYWdzOiBmdW5jdGlvbiBmZF9mZHN0YXRfc2V0X2ZsYWdzKGlucHV0KSB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX2Zkc3RhdF9zZXRfcmlnaHRzOiBmdW5jdGlvbiBmZF9mZHN0YXRfc2V0X3JpZ2h0cyhpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9maWxlc3RhdF9nZXQ6IGZ1bmN0aW9uIGZkX2ZpbGVzdGF0X2dldChpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9maWxlc3RhdF9zZXRfc2l6ZTogZnVuY3Rpb24gZmRfZmlsZXN0YXRfc2V0X3NpemUoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfZmlsZXN0YXRfc2V0X3RpbWVzOiBmdW5jdGlvbiBmZF9maWxlc3RhdF9zZXRfdGltZXMoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfcHJlYWQ6IGZ1bmN0aW9uIGZkX3ByZWFkKGlucHV0KSB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX3ByZXN0YXRfZ2V0OiBmdW5jdGlvbiBmZF9wcmVzdGF0X2dldChpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9wcmVzdGF0X2Rpcl9uYW1lOiBmdW5jdGlvbiBmZF9wcmVzdGF0X2Rpcl9uYW1lKGlucHV0KSB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX3B3cml0ZTogZnVuY3Rpb24gZmRfcHdyaXRlKGlucHV0KSB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX3JlYWQ6IGZ1bmN0aW9uIGZkX3JlYWQoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfcmVhZGRpcjogZnVuY3Rpb24gZmRfcmVhZGRpcihpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9yZW51bWJlcjogZnVuY3Rpb24gZmRfcmVudW1iZXIoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfc2VlazogZnVuY3Rpb24gZmRfc2VlayhpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9zeW5jOiBmdW5jdGlvbiBmZF9zeW5jKGlucHV0KSB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX3RlbGw6IGZ1bmN0aW9uIGZkX3RlbGwoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfd3JpdGU6IGZ1bmN0aW9uIGZkX3dyaXRlKGlucHV0KSB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHBhdGhfY3JlYXRlX2RpcmVjdG9yeTogZnVuY3Rpb24gcGF0aF9jcmVhdGVfZGlyZWN0b3J5KGlucHV0KSB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHBhdGhfZmlsZXN0YXRfZ2V0OiBmdW5jdGlvbiBwYXRoX2ZpbGVzdGF0X2dldChpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBwYXRoX2ZpbGVzdGF0X3NldF90aW1lczogZnVuY3Rpb24gcGF0aF9maWxlc3RhdF9zZXRfdGltZXMoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcGF0aF9saW5rOiBmdW5jdGlvbiBwYXRoX2xpbmsoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcGF0aF9vcGVuOiBmdW5jdGlvbiBwYXRoX29wZW4oaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcGF0aF9yZWFkbGluazogZnVuY3Rpb24gcGF0aF9yZWFkbGluayhpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBwYXRoX3JlbW92ZV9kaXJlY3Rvcnk6IGZ1bmN0aW9uIHBhdGhfcmVtb3ZlX2RpcmVjdG9yeShpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBwYXRoX3JlbmFtZTogZnVuY3Rpb24gcGF0aF9yZW5hbWUoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcGF0aF9zeW1saW5rOiBmdW5jdGlvbiBwYXRoX3N5bWxpbmsoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcGF0aF91bmxpbmtfZmlsZTogZnVuY3Rpb24gcGF0aF91bmxpbmtfZmlsZShpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBwb2xsX29uZW9mZjogZnVuY3Rpb24gcG9sbF9vbmVvZmYoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcHJvY19leGl0OiBmdW5jdGlvbiBwcm9jX2V4aXQoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcHJvY19yYWlzZTogZnVuY3Rpb24gcHJvY19yYWlzZShpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBzY2hlZF95aWVsZDogZnVuY3Rpb24gc2NoZWRfeWllbGQoaW5wdXQpIHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcmFuZG9tX2dldDogZnVuY3Rpb24gcmFuZG9tX2dldChpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBzb2NrX3JlY3Y6IGZ1bmN0aW9uIHNvY2tfcmVjdihpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBzb2NrX3NlbmQ6IGZ1bmN0aW9uIHNvY2tfc2VuZChpbnB1dCkgewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBzb2NrX3NodXRkb3duOiBmdW5jdGlvbiBzb2NrX3NodXRkb3duKGlucHV0KSB7CiAgICAgIHJldHVybiAwOwogICAgfQogIH07CgogIHZhciBQVl9TVEFUVVNfU1VDQ0VTUyA9IDEwMDAwOwoKICB2YXIgRG93bnNhbXBsZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkgewogICAgZnVuY3Rpb24gRG93bnNhbXBsZXIoaGFuZGxlV2FzbSkgewogICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRG93bnNhbXBsZXIpOwoKICAgICAgRG93bnNhbXBsZXIuX3ZlcnNpb24gPSBoYW5kbGVXYXNtLnZlcnNpb247CiAgICAgIHRoaXMuX3B2RG93bnNhbXBsZXJDb252ZXJ0TnVtU2FtcGxlc1RvSW5wdXRTYW1wbGVSYXRlID0gaGFuZGxlV2FzbS5wdkRvd25zYW1wbGVyQ29udmVydE51bVNhbXBsZXNUb0lucHV0U2FtcGxlUmF0ZTsKICAgICAgdGhpcy5fcHZEb3duc2FtcGxlclJlc2V0ID0gaGFuZGxlV2FzbS5wdkRvd25zYW1wbGVyUmVzZXQ7CiAgICAgIHRoaXMuX3B2RG93bnNhbXBsZXJQcm9jZXNzID0gaGFuZGxlV2FzbS5wdkRvd25zYW1wbGVyUHJvY2VzczsKICAgICAgdGhpcy5fcHZEb3duc2FtcGxlckRlbGV0ZSA9IGhhbmRsZVdhc20ucHZEb3duc2FtcGxlckRlbGV0ZTsKICAgICAgdGhpcy5fd2FzbU1lbW9yeSA9IGhhbmRsZVdhc20ubWVtb3J5OwogICAgICB0aGlzLl9pbnB1dEJ1ZmZlckFkZHJlc3MgPSBoYW5kbGVXYXNtLmlucHV0QnVmZmVyQWRkcmVzczsKICAgICAgdGhpcy5fb2JqZWN0QWRkcmVzcyA9IGhhbmRsZVdhc20ub2JqZWN0QWRkcmVzczsKICAgICAgdGhpcy5fb3V0cHV0QnVmZmVyQWRkcmVzcyA9IGhhbmRsZVdhc20ub3V0cHV0QnVmZmVyQWRkcmVzczsKICAgICAgdGhpcy5fbWVtb3J5QnVmZmVyID0gbmV3IEludDE2QXJyYXkoaGFuZGxlV2FzbS5tZW1vcnkuYnVmZmVyKTsKICAgICAgdGhpcy5fbWVtb3J5QnVmZmVyVmlldyA9IG5ldyBEYXRhVmlldyhoYW5kbGVXYXNtLm1lbW9yeS5idWZmZXIpOwogICAgfQoKICAgIF9jcmVhdGVDbGFzcyhEb3duc2FtcGxlciwgW3sKICAgICAga2V5OiAicHJvY2VzcyIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcm9jZXNzKGlucHV0QnVmZmVyLCBpbnB1dEJ1ZmZlclNpemUsIG91dHB1dEJ1ZmZlcikgewogICAgICAgIHRoaXMuX21lbW9yeUJ1ZmZlci5zZXQoaW5wdXRCdWZmZXIsIHRoaXMuX2lucHV0QnVmZmVyQWRkcmVzcyAvIEludDE2QXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwoKICAgICAgICB2YXIgcHJvY2Vzc2VkU2FtcGxlcyA9IHRoaXMuX3B2RG93bnNhbXBsZXJQcm9jZXNzKHRoaXMuX29iamVjdEFkZHJlc3MsIHRoaXMuX2lucHV0QnVmZmVyQWRkcmVzcywgaW5wdXRCdWZmZXJTaXplLCB0aGlzLl9vdXRwdXRCdWZmZXJBZGRyZXNzKTsKCiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9jZXNzZWRTYW1wbGVzOyBpKyspIHsKICAgICAgICAgIG91dHB1dEJ1ZmZlcltpXSA9IHRoaXMuX21lbW9yeUJ1ZmZlclZpZXcuZ2V0SW50MTYodGhpcy5fb3V0cHV0QnVmZmVyQWRkcmVzcyArIGkgKiBJbnQxNkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCB0cnVlKTsKICAgICAgICB9CgogICAgICAgIHJldHVybiBwcm9jZXNzZWRTYW1wbGVzOwogICAgICB9CiAgICB9LCB7CiAgICAgIGtleTogInJlc2V0IiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlc2V0KCkgewogICAgICAgIHRoaXMuX3B2RG93bnNhbXBsZXJSZXNldCh0aGlzLl9vYmplY3RBZGRyZXNzKTsKICAgICAgfQogICAgfSwgewogICAgICBrZXk6ICJkZWxldGUiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gX2RlbGV0ZSgpIHsKICAgICAgICB0aGlzLl9wdkRvd25zYW1wbGVyRGVsZXRlKHRoaXMuX29iamVjdEFkZHJlc3MpOwogICAgICB9CiAgICB9LCB7CiAgICAgIGtleTogInZlcnNpb24iLAogICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHsKICAgICAgICByZXR1cm4gRG93bnNhbXBsZXIuX3ZlcnNpb247CiAgICAgIH0KICAgIH0sIHsKICAgICAga2V5OiAiZ2V0TnVtUmVxdWlyZWRJbnB1dFNhbXBsZXMiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TnVtUmVxdWlyZWRJbnB1dFNhbXBsZXMobnVtU2FtcGxlKSB7CiAgICAgICAgcmV0dXJuIHRoaXMuX3B2RG93bnNhbXBsZXJDb252ZXJ0TnVtU2FtcGxlc1RvSW5wdXRTYW1wbGVSYXRlKHRoaXMuX29iamVjdEFkZHJlc3MsIG51bVNhbXBsZSk7CiAgICAgIH0KICAgIH1dLCBbewogICAgICBrZXk6ICJjcmVhdGUiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gKCkgewogICAgICAgIHZhciBfY3JlYXRlID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9yZWdlbmVyYXRvci5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoaW5wdXRGcmVxdWVuY3ksIG91dHB1dEZyZXF1ZW5jeSwgb3JkZXIsIGZyYW1lTGVuZ3RoKSB7CiAgICAgICAgICB2YXIgd2FzbU91dHB1dDsKICAgICAgICAgIHJldHVybiByZWdlbmVyYXRvci53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7CiAgICAgICAgICAgIHdoaWxlICgxKSB7CiAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkgewogICAgICAgICAgICAgICAgY2FzZSAwOgogICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjsKICAgICAgICAgICAgICAgICAgcmV0dXJuIERvd25zYW1wbGVyLmluaXRXYXNtKGlucHV0RnJlcXVlbmN5LCBvdXRwdXRGcmVxdWVuY3ksIG9yZGVyLCBmcmFtZUxlbmd0aCk7CgogICAgICAgICAgICAgICAgY2FzZSAyOgogICAgICAgICAgICAgICAgICB3YXNtT3V0cHV0ID0gX2NvbnRleHQuc2VudDsKICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdCgicmV0dXJuIiwgbmV3IERvd25zYW1wbGVyKHdhc21PdXRwdXQpKTsKCiAgICAgICAgICAgICAgICBjYXNlIDQ6CiAgICAgICAgICAgICAgICBjYXNlICJlbmQiOgogICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgfSwgX2NhbGxlZSk7CiAgICAgICAgfSkpOwoKICAgICAgICBmdW5jdGlvbiBjcmVhdGUoX3gsIF94MiwgX3gzLCBfeDQpIHsKICAgICAgICAgIHJldHVybiBfY3JlYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7CiAgICAgICAgfQoKICAgICAgICByZXR1cm4gY3JlYXRlOwogICAgICB9KCkKICAgIH0sIHsKICAgICAga2V5OiAiaW5pdFdhc20iLAogICAgICB2YWx1ZTogZnVuY3Rpb24gKCkgewogICAgICAgIHZhciBfaW5pdFdhc20gPSBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL3JlZ2VuZXJhdG9yLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTIoaW5wdXRGcmVxdWVuY3ksIG91dHB1dEZyZXF1ZW5jeSwgb3JkZXIsIGZyYW1lTGVuZ3RoKSB7CiAgICAgICAgICB2YXIgbWVtb3J5LCBtZW1vcnlCdWZmZXJVaW50OCwgcHZDb25zb2xlTG9nV2FzbSwgcHZBc3NlcnRXYXNtLCBpbXBvcnRPYmplY3QsIHdhc21Db2RlQXJyYXksIF95aWVsZCRXZWJBc3NlbWJseSRpbiwgaW5zdGFuY2UsIGFsaWduZWRBbGxvYywgcHZEb3duc2FtcGxlckluaXQsIHB2RG93bnNhbXBsZXJDb252ZXJ0TnVtU2FtcGxlc1RvSW5wdXRTYW1wbGVSYXRlLCBwdkRvd25zYW1wbGVyVmVyc2lvbiwgb2JqZWN0QWRkcmVzc0FkZHJlc3MsIHN0YXR1cywgdmVyc2lvbkFkZHJlc3MsIHZlcnNpb24sIG1lbW9yeUJ1ZmZlclZpZXcsIG9iamVjdEFkZHJlc3MsIGlucHV0ZnJhbWVMZW5ndGgsIGlucHV0QnVmZmVyQWRkcmVzcywgb3V0cHV0QnVmZmVyQWRkcmVzcywgcHZEb3duc2FtcGxlclJlc2V0LCBwdkRvd25zYW1wbGVyUHJvY2VzcywgcHZEb3duc2FtcGxlckRlbGV0ZTsKCiAgICAgICAgICByZXR1cm4gcmVnZW5lcmF0b3Iud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7CiAgICAgICAgICAgIHdoaWxlICgxKSB7CiAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7CiAgICAgICAgICAgICAgICBjYXNlIDA6CiAgICAgICAgICAgICAgICAgIG1lbW9yeSA9IG5ldyBXZWJBc3NlbWJseS5NZW1vcnkoewogICAgICAgICAgICAgICAgICAgIGluaXRpYWw6IDY0LAogICAgICAgICAgICAgICAgICAgIG1heGltdW06IDEyOAogICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgbWVtb3J5QnVmZmVyVWludDggPSBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKTsKCiAgICAgICAgICAgICAgICAgIHB2Q29uc29sZUxvZ1dhc20gPSBmdW5jdGlvbiBwdkNvbnNvbGVMb2dXYXNtKGluZGV4KSB7CiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyYXlCdWZmZXJUb1N0cmluZ0F0SW5kZXgobWVtb3J5QnVmZmVyVWludDgsIGluZGV4KSk7CiAgICAgICAgICAgICAgICAgIH07CgogICAgICAgICAgICAgICAgICBwdkFzc2VydFdhc20gPSBmdW5jdGlvbiBwdkFzc2VydFdhc20oZXhwciwgbGluZSwgZmlsZU5hbWVBZGRyZXNzKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cHIgPT09IDApIHsKICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlTmFtZSA9IGFycmF5QnVmZmVyVG9TdHJpbmdBdEluZGV4KG1lbW9yeUJ1ZmZlclVpbnQ4LCBmaWxlTmFtZUFkZHJlc3MpOwogICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJhc3NlcnRpb24gZmFpbGVkIGF0IGxpbmUgIi5jb25jYXQobGluZSwgIiBpbiBcIiIpLmNvbmNhdChmaWxlTmFtZSwgIlwiIikpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgfTsKCiAgICAgICAgICAgICAgICAgIGltcG9ydE9iamVjdCA9IHsKICAgICAgICAgICAgICAgICAgICB3YXNpX3NuYXBzaG90X3ByZXZpZXcxOiB3YXNpU25hcHNob3RQcmV2aWV3MUVtdWxhdG9yLAogICAgICAgICAgICAgICAgICAgIGVudjogewogICAgICAgICAgICAgICAgICAgICAgbWVtb3J5OiBtZW1vcnksCiAgICAgICAgICAgICAgICAgICAgICBwdl9jb25zb2xlX2xvZ193YXNtOiBwdkNvbnNvbGVMb2dXYXNtLAogICAgICAgICAgICAgICAgICAgICAgcHZfYXNzZXJ0X3dhc206IHB2QXNzZXJ0V2FzbQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgfTsKICAgICAgICAgICAgICAgICAgd2FzbUNvZGVBcnJheSA9IGJhc2U2NFRvVWludDhBcnJheShXQVNNX0JBU0U2NCk7CiAgICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gODsKICAgICAgICAgICAgICAgICAgcmV0dXJuIFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKHdhc21Db2RlQXJyYXksIGltcG9ydE9iamVjdCk7CgogICAgICAgICAgICAgICAgY2FzZSA4OgogICAgICAgICAgICAgICAgICBfeWllbGQkV2ViQXNzZW1ibHkkaW4gPSBfY29udGV4dDIuc2VudDsKICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBfeWllbGQkV2ViQXNzZW1ibHkkaW4uaW5zdGFuY2U7CiAgICAgICAgICAgICAgICAgIGFsaWduZWRBbGxvYyA9IGluc3RhbmNlLmV4cG9ydHMuYWxpZ25lZF9hbGxvYzsKICAgICAgICAgICAgICAgICAgcHZEb3duc2FtcGxlckluaXQgPSBpbnN0YW5jZS5leHBvcnRzLnB2X2Rvd25zYW1wbGVyX2luaXQ7CiAgICAgICAgICAgICAgICAgIHB2RG93bnNhbXBsZXJDb252ZXJ0TnVtU2FtcGxlc1RvSW5wdXRTYW1wbGVSYXRlID0gaW5zdGFuY2UuZXhwb3J0cy5wdl9kb3duc2FtcGxlcl9jb252ZXJ0X251bV9zYW1wbGVzX3RvX2lucHV0X3NhbXBsZV9yYXRlOwogICAgICAgICAgICAgICAgICBwdkRvd25zYW1wbGVyVmVyc2lvbiA9IGluc3RhbmNlLmV4cG9ydHMucHZfZG93bnNhbXBsZXJfdmVyc2lvbjsKICAgICAgICAgICAgICAgICAgb2JqZWN0QWRkcmVzc0FkZHJlc3MgPSBhbGlnbmVkQWxsb2MoSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CgogICAgICAgICAgICAgICAgICBpZiAoIShvYmplY3RBZGRyZXNzQWRkcmVzcyA9PT0gMCkpIHsKICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDE3OwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21hbGxvYyBmYWlsZWQ6IENhbm5vdCBhbGxvY2F0ZSBtZW1vcnknKTsKCiAgICAgICAgICAgICAgICBjYXNlIDE3OgogICAgICAgICAgICAgICAgICBzdGF0dXMgPSBwdkRvd25zYW1wbGVySW5pdChpbnB1dEZyZXF1ZW5jeSwgb3V0cHV0RnJlcXVlbmN5LCBvcmRlciwgb2JqZWN0QWRkcmVzc0FkZHJlc3MpOwogICAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDIwOwogICAgICAgICAgICAgICAgICByZXR1cm4gcHZEb3duc2FtcGxlclZlcnNpb24oKTsKCiAgICAgICAgICAgICAgICBjYXNlIDIwOgogICAgICAgICAgICAgICAgICB2ZXJzaW9uQWRkcmVzcyA9IF9jb250ZXh0Mi5zZW50OwogICAgICAgICAgICAgICAgICB2ZXJzaW9uID0gYXJyYXlCdWZmZXJUb1N0cmluZ0F0SW5kZXgobWVtb3J5QnVmZmVyVWludDgsIHZlcnNpb25BZGRyZXNzKTsKCiAgICAgICAgICAgICAgICAgIGlmICghKHN0YXR1cyAhPT0gUFZfU1RBVFVTX1NVQ0NFU1MpKSB7CiAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAyNDsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgfQoKICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJwdl9kb3duc2FtcGxlcl9pbml0IGZhaWxlZCB3aXRoIHN0YXR1cyAiLmNvbmNhdChzdGF0dXMpKTsKCiAgICAgICAgICAgICAgICBjYXNlIDI0OgogICAgICAgICAgICAgICAgICBtZW1vcnlCdWZmZXJWaWV3ID0gbmV3IERhdGFWaWV3KG1lbW9yeS5idWZmZXIpOwogICAgICAgICAgICAgICAgICBvYmplY3RBZGRyZXNzID0gbWVtb3J5QnVmZmVyVmlldy5nZXRJbnQzMihvYmplY3RBZGRyZXNzQWRkcmVzcywgdHJ1ZSk7CiAgICAgICAgICAgICAgICAgIGlucHV0ZnJhbWVMZW5ndGggPSBwdkRvd25zYW1wbGVyQ29udmVydE51bVNhbXBsZXNUb0lucHV0U2FtcGxlUmF0ZShvYmplY3RBZGRyZXNzLCBmcmFtZUxlbmd0aCk7CiAgICAgICAgICAgICAgICAgIGlucHV0QnVmZmVyQWRkcmVzcyA9IGFsaWduZWRBbGxvYyhJbnQxNkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCAoaW5wdXRmcmFtZUxlbmd0aCArIDEpICogSW50MTZBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CgogICAgICAgICAgICAgICAgICBpZiAoIShpbnB1dEJ1ZmZlckFkZHJlc3MgPT09IDApKSB7CiAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAzMDsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgfQoKICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYWxsb2MgZmFpbGVkOiBDYW5ub3QgYWxsb2NhdGUgbWVtb3J5Jyk7CgogICAgICAgICAgICAgICAgY2FzZSAzMDoKICAgICAgICAgICAgICAgICAgb3V0cHV0QnVmZmVyQWRkcmVzcyA9IGFsaWduZWRBbGxvYyhJbnQxNkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCBmcmFtZUxlbmd0aCAqIEludDE2QXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwoKICAgICAgICAgICAgICAgICAgaWYgKCEob3V0cHV0QnVmZmVyQWRkcmVzcyA9PT0gMCkpIHsKICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDMzOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21hbGxvYyBmYWlsZWQ6IENhbm5vdCBhbGxvY2F0ZSBtZW1vcnknKTsKCiAgICAgICAgICAgICAgICBjYXNlIDMzOgogICAgICAgICAgICAgICAgICBwdkRvd25zYW1wbGVyUmVzZXQgPSBpbnN0YW5jZS5leHBvcnRzLnB2X2Rvd25zYW1wbGVyX3Jlc2V0OwogICAgICAgICAgICAgICAgICBwdkRvd25zYW1wbGVyUHJvY2VzcyA9IGluc3RhbmNlLmV4cG9ydHMucHZfZG93bnNhbXBsZXJfcHJvY2VzczsKICAgICAgICAgICAgICAgICAgcHZEb3duc2FtcGxlckRlbGV0ZSA9IGluc3RhbmNlLmV4cG9ydHMucHZfZG93bnNhbXBsZXJfZGVsZXRlOwogICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdCgicmV0dXJuIiwgewogICAgICAgICAgICAgICAgICAgIGlucHV0QnVmZmVyQWRkcmVzczogaW5wdXRCdWZmZXJBZGRyZXNzLAogICAgICAgICAgICAgICAgICAgIGlucHV0ZnJhbWVMZW5ndGg6IGlucHV0ZnJhbWVMZW5ndGgsCiAgICAgICAgICAgICAgICAgICAgbWVtb3J5OiBtZW1vcnksCiAgICAgICAgICAgICAgICAgICAgb2JqZWN0QWRkcmVzczogb2JqZWN0QWRkcmVzcywKICAgICAgICAgICAgICAgICAgICBvdXRwdXRCdWZmZXJBZGRyZXNzOiBvdXRwdXRCdWZmZXJBZGRyZXNzLAogICAgICAgICAgICAgICAgICAgIHB2RG93bnNhbXBsZXJDb252ZXJ0TnVtU2FtcGxlc1RvSW5wdXRTYW1wbGVSYXRlOiBwdkRvd25zYW1wbGVyQ29udmVydE51bVNhbXBsZXNUb0lucHV0U2FtcGxlUmF0ZSwKICAgICAgICAgICAgICAgICAgICBwdkRvd25zYW1wbGVySW5pdDogcHZEb3duc2FtcGxlckluaXQsCiAgICAgICAgICAgICAgICAgICAgcHZEb3duc2FtcGxlclByb2Nlc3M6IHB2RG93bnNhbXBsZXJQcm9jZXNzLAogICAgICAgICAgICAgICAgICAgIHB2RG93bnNhbXBsZXJSZXNldDogcHZEb3duc2FtcGxlclJlc2V0LAogICAgICAgICAgICAgICAgICAgIHB2RG93bnNhbXBsZXJEZWxldGU6IHB2RG93bnNhbXBsZXJEZWxldGUsCiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogdmVyc2lvbgogICAgICAgICAgICAgICAgICB9KTsKCiAgICAgICAgICAgICAgICBjYXNlIDM3OgogICAgICAgICAgICAgICAgY2FzZSAiZW5kIjoKICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICB9LCBfY2FsbGVlMik7CiAgICAgICAgfSkpOwoKICAgICAgICBmdW5jdGlvbiBpbml0V2FzbShfeDUsIF94NiwgX3g3LCBfeDgpIHsKICAgICAgICAgIHJldHVybiBfaW5pdFdhc20uYXBwbHkodGhpcywgYXJndW1lbnRzKTsKICAgICAgICB9CgogICAgICAgIHJldHVybiBpbml0V2FzbTsKICAgICAgfSgpCiAgICB9XSk7CgogICAgcmV0dXJuIERvd25zYW1wbGVyOwogIH0oKTsKCiAgdmFyIFBWX0ZSQU1FX0xFTkdUSCA9IDUxMjsKICB2YXIgUFZfU0FNUExFX1JBVEUgPSAxNjAwMDsKICB2YXIgUFZfRklMVEVSX09SREVSID0gNTA7CgogIHZhciBfZG93bnNhbXBsZXI7CgogIHZhciBfb3V0cHV0ZnJhbWVMZW5ndGg7CgogIHZhciBfb2xkSW5wdXRCdWZmZXI7CgogIHZhciBfb3V0cHV0QnVmZmVyOwoKICB2YXIgX2F1ZGlvRHVtcEFjdGl2ZTsKCiAgdmFyIF9hdWRpb0R1bXBCdWZmZXI7CgogIHZhciBfYXVkaW9EdW1wQnVmZmVySW5kZXg7CgogIHZhciBfYXVkaW9EdW1wTnVtRnJhbWVzOwoKICBmdW5jdGlvbiBpbml0KF94KSB7CiAgICByZXR1cm4gX2luaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTsKICB9CgogIGZ1bmN0aW9uIF9pbml0KCkgewogICAgX2luaXQgPSBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL3JlZ2VuZXJhdG9yLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShpbnB1dFNhbXBsZVJhdGUpIHsKICAgICAgdmFyIG91dHB1dFNhbXBsZVJhdGUsCiAgICAgICAgICBmcmFtZUxlbmd0aCwKICAgICAgICAgIGVycm9yTWVzc2FnZSwKICAgICAgICAgIF9hcmdzID0gYXJndW1lbnRzOwogICAgICByZXR1cm4gcmVnZW5lcmF0b3Iud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkgewogICAgICAgIHdoaWxlICgxKSB7CiAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7CiAgICAgICAgICAgIGNhc2UgMDoKICAgICAgICAgICAgICBvdXRwdXRTYW1wbGVSYXRlID0gX2FyZ3MubGVuZ3RoID4gMSAmJiBfYXJnc1sxXSAhPT0gdW5kZWZpbmVkID8gX2FyZ3NbMV0gOiBQVl9TQU1QTEVfUkFURTsKICAgICAgICAgICAgICBmcmFtZUxlbmd0aCA9IF9hcmdzLmxlbmd0aCA+IDIgJiYgX2FyZ3NbMl0gIT09IHVuZGVmaW5lZCA/IF9hcmdzWzJdIDogUFZfRlJBTUVfTEVOR1RIOwoKICAgICAgICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihpbnB1dFNhbXBsZVJhdGUpKSB7CiAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNDsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgIH0KCiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJJbnZhbGlkIGlucHV0U2FtcGxlUmF0ZSB2YWx1ZTogIi5jb25jYXQoaW5wdXRTYW1wbGVSYXRlLCAiLiBFeHBlY3RlZCBpbnRlZ2VyLiIpKTsKCiAgICAgICAgICAgIGNhc2UgNDoKICAgICAgICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihvdXRwdXRTYW1wbGVSYXRlKSkgewogICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDY7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiSW52YWxpZCBvdXRwdXRTYW1wbGVSYXRlIHZhbHVlOiAiLmNvbmNhdChvdXRwdXRTYW1wbGVSYXRlLCAiLiBFeHBlY3RlZCBpbnRlZ2VyLiIpKTsKCiAgICAgICAgICAgIGNhc2UgNjoKICAgICAgICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihmcmFtZUxlbmd0aCkpIHsKICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA4OwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgfQoKICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkludmFsaWQgZnJhbWVMZW5ndGggdmFsdWU6ICIuY29uY2F0KGZyYW1lTGVuZ3RoLCAiLiBFeHBlY3RlZCBpbnRlZ2VyLiIpKTsKCiAgICAgICAgICAgIGNhc2UgODoKICAgICAgICAgICAgICBfb3V0cHV0ZnJhbWVMZW5ndGggPSBmcmFtZUxlbmd0aDsKICAgICAgICAgICAgICBfb2xkSW5wdXRCdWZmZXIgPSBuZXcgSW50MTZBcnJheShbXSk7CiAgICAgICAgICAgICAgX2NvbnRleHQucHJldiA9IDEwOwogICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxMzsKICAgICAgICAgICAgICByZXR1cm4gRG93bnNhbXBsZXIuY3JlYXRlKGlucHV0U2FtcGxlUmF0ZSwgb3V0cHV0U2FtcGxlUmF0ZSwgUFZfRklMVEVSX09SREVSLCBfb3V0cHV0ZnJhbWVMZW5ndGgpOwoKICAgICAgICAgICAgY2FzZSAxMzoKICAgICAgICAgICAgICBfZG93bnNhbXBsZXIgPSBfY29udGV4dC5zZW50OwogICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdkcy1yZWFkeScKICAgICAgICAgICAgICB9LCB1bmRlZmluZWQpOwogICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyMTsKICAgICAgICAgICAgICBicmVhazsKCiAgICAgICAgICAgIGNhc2UgMTc6CiAgICAgICAgICAgICAgX2NvbnRleHQucHJldiA9IDE3OwogICAgICAgICAgICAgIF9jb250ZXh0LnQwID0gX2NvbnRleHRbImNhdGNoIl0oMTApOwogICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IF9jb250ZXh0LnQwLnRvU3RyaW5nKCk7CiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgICAgY29tbWFuZDogJ2RzLWZhaWxlZCcsCiAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UKICAgICAgICAgICAgICB9LCB1bmRlZmluZWQpOwoKICAgICAgICAgICAgY2FzZSAyMToKICAgICAgICAgICAgY2FzZSAiZW5kIjoKICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpOwogICAgICAgICAgfQogICAgICAgIH0KICAgICAgfSwgX2NhbGxlZSwgbnVsbCwgW1sxMCwgMTddXSk7CiAgICB9KSk7CiAgICByZXR1cm4gX2luaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTsKICB9CgogIGZ1bmN0aW9uIHN0YXJ0QXVkaW9EdW1wKCkgewogICAgdmFyIGR1cmF0aW9uTXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDMwMDA7CiAgICBfYXVkaW9EdW1wTnVtRnJhbWVzID0gTWF0aC5mbG9vcihkdXJhdGlvbk1zICogUFZfU0FNUExFX1JBVEUgLyAxMDAwIC8gUFZfRlJBTUVfTEVOR1RIKTsKICAgIF9hdWRpb0R1bXBBY3RpdmUgPSB0cnVlOwogICAgX2F1ZGlvRHVtcEJ1ZmZlckluZGV4ID0gMDsKICAgIF9hdWRpb0R1bXBCdWZmZXIgPSBuZXcgSW50MTZBcnJheShfYXVkaW9EdW1wTnVtRnJhbWVzICogX291dHB1dGZyYW1lTGVuZ3RoKTsKICB9CgogIGZ1bmN0aW9uIHByb2Nlc3NBdWRpbyhpbnB1dEZyYW1lKSB7CiAgICBpZiAoaW5wdXRGcmFtZS5jb25zdHJ1Y3RvciAhPT0gRmxvYXQzMkFycmF5KSB7CiAgICAgIHRocm93IG5ldyBFcnJvcigiSW52YWxpZCBpbnB1dEZyYW1lIHR5cGU6ICIuY29uY2F0KF90eXBlb2YoaW5wdXRGcmFtZSksICIuIEV4cGVjdGVkIEZsb2F0MzJBcnJheS4iKSk7CiAgICB9CgogICAgdmFyIGlucHV0QnVmZmVyID0gbmV3IEludDE2QXJyYXkoaW5wdXRGcmFtZS5sZW5ndGgpOwoKICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRGcmFtZS5sZW5ndGg7IGkrKykgewogICAgICBpZiAoaW5wdXRGcmFtZVtpXSA8IDApIHsKICAgICAgICBpbnB1dEJ1ZmZlcltpXSA9IDB4ODAwMCAqIGlucHV0RnJhbWVbaV07CiAgICAgIH0gZWxzZSB7CiAgICAgICAgaW5wdXRCdWZmZXJbaV0gPSAweDdmZmYgKiBpbnB1dEZyYW1lW2ldOwogICAgICB9CiAgICB9CgogICAgdmFyIGlucHV0QnVmZmVyRXh0ZW5kZWQgPSBuZXcgSW50MTZBcnJheShfb2xkSW5wdXRCdWZmZXIubGVuZ3RoICsgaW5wdXRCdWZmZXIubGVuZ3RoKTsKICAgIGlucHV0QnVmZmVyRXh0ZW5kZWQuc2V0KF9vbGRJbnB1dEJ1ZmZlcik7CiAgICBpbnB1dEJ1ZmZlckV4dGVuZGVkLnNldChpbnB1dEJ1ZmZlciwgX29sZElucHV0QnVmZmVyLmxlbmd0aCk7CiAgICBfb2xkSW5wdXRCdWZmZXIgPSBuZXcgSW50MTZBcnJheShbXSk7CgogICAgd2hpbGUgKGlucHV0QnVmZmVyRXh0ZW5kZWQubGVuZ3RoID4gMCkgewogICAgICB2YXIgbnVtSW5wdXRTYW1wbGVzID0gX2Rvd25zYW1wbGVyLmdldE51bVJlcXVpcmVkSW5wdXRTYW1wbGVzKF9vdXRwdXRmcmFtZUxlbmd0aCkgKyAxOwoKICAgICAgaWYgKG51bUlucHV0U2FtcGxlcyA+IGlucHV0QnVmZmVyRXh0ZW5kZWQubGVuZ3RoKSB7CiAgICAgICAgX29sZElucHV0QnVmZmVyID0gbmV3IEludDE2QXJyYXkoaW5wdXRCdWZmZXJFeHRlbmRlZC5sZW5ndGgpOwoKICAgICAgICBfb2xkSW5wdXRCdWZmZXIuc2V0KGlucHV0QnVmZmVyRXh0ZW5kZWQpOwoKICAgICAgICBpbnB1dEJ1ZmZlckV4dGVuZGVkID0gaW5wdXRCdWZmZXJFeHRlbmRlZC5zbGljZShpbnB1dEJ1ZmZlckV4dGVuZGVkLmxlbmd0aCk7CiAgICAgIH0gZWxzZSB7CiAgICAgICAgX291dHB1dEJ1ZmZlciA9IG5ldyBJbnQxNkFycmF5KF9vdXRwdXRmcmFtZUxlbmd0aCk7CgogICAgICAgIF9kb3duc2FtcGxlci5wcm9jZXNzKGlucHV0QnVmZmVyRXh0ZW5kZWQuc2xpY2UoMCwgbnVtSW5wdXRTYW1wbGVzKSwgbnVtSW5wdXRTYW1wbGVzLCBfb3V0cHV0QnVmZmVyKTsKCiAgICAgICAgaWYgKF9hdWRpb0R1bXBBY3RpdmUpIHsKICAgICAgICAgIF9hdWRpb0R1bXBCdWZmZXIuc2V0KF9vdXRwdXRCdWZmZXIsIF9hdWRpb0R1bXBCdWZmZXJJbmRleCAqIF9vdXRwdXRmcmFtZUxlbmd0aCk7CgogICAgICAgICAgX2F1ZGlvRHVtcEJ1ZmZlckluZGV4Kys7CgogICAgICAgICAgaWYgKF9hdWRpb0R1bXBCdWZmZXJJbmRleCA9PT0gX2F1ZGlvRHVtcE51bUZyYW1lcykgewogICAgICAgICAgICBfYXVkaW9EdW1wQWN0aXZlID0gZmFsc2U7CiAgICAgICAgICAgIHZhciBwY21CbG9iID0gbmV3IEJsb2IoW19hdWRpb0R1bXBCdWZmZXJdLCB7CiAgICAgICAgICAgICAgdHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScKICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICBjb21tYW5kOiAnYXVkaW9fZHVtcF9jb21wbGV0ZScsCiAgICAgICAgICAgICAgYmxvYjogcGNtQmxvYgogICAgICAgICAgICB9LCB1bmRlZmluZWQpOwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgcG9zdE1lc3NhZ2UoewogICAgICAgICAgY29tbWFuZDogJ291dHB1dCcsCiAgICAgICAgICBvdXRwdXRGcmFtZTogX291dHB1dEJ1ZmZlcgogICAgICAgIH0sIHVuZGVmaW5lZCk7CiAgICAgICAgaW5wdXRCdWZmZXJFeHRlbmRlZCA9IGlucHV0QnVmZmVyRXh0ZW5kZWQuc2xpY2UobnVtSW5wdXRTYW1wbGVzKTsKICAgICAgfQogICAgfQogIH0KCiAgZnVuY3Rpb24gcmVzZXQoKSB7CiAgICBfZG93bnNhbXBsZXIucmVzZXQoKTsKCiAgICBfb2xkSW5wdXRCdWZmZXIgPSBuZXcgSW50MTZBcnJheShbXSk7CiAgfQoKICBmdW5jdGlvbiByZWxlYXNlKCkgewogICAgX2Rvd25zYW1wbGVyWyJkZWxldGUiXSgpOwogIH0KCiAgb25tZXNzYWdlID0gZnVuY3Rpb24gb25tZXNzYWdlKGV2ZW50KSB7CiAgICBzd2l0Y2ggKGV2ZW50LmRhdGEuY29tbWFuZCkgewogICAgICBjYXNlICdpbml0JzoKICAgICAgICBpbml0KGV2ZW50LmRhdGEuaW5wdXRTYW1wbGVSYXRlLCBldmVudC5kYXRhLm91dHB1dFNhbXBsZVJhdGUsIGV2ZW50LmRhdGEuZnJhbWVMZW5ndGgpOwogICAgICAgIGJyZWFrOwoKICAgICAgY2FzZSAncHJvY2Vzcyc6CiAgICAgICAgcHJvY2Vzc0F1ZGlvKGV2ZW50LmRhdGEuaW5wdXRGcmFtZSk7CiAgICAgICAgYnJlYWs7CgogICAgICBjYXNlICdyZXNldCc6CiAgICAgICAgcmVzZXQoKTsKICAgICAgICBicmVhazsKCiAgICAgIGNhc2UgJ3JlbGVhc2UnOgogICAgICAgIHJlbGVhc2UoKTsKICAgICAgICBicmVhazsKCiAgICAgIGNhc2UgJ3N0YXJ0X2F1ZGlvX2R1bXAnOgogICAgICAgIHN0YXJ0QXVkaW9EdW1wKGV2ZW50LmRhdGEuZHVyYXRpb25Ncyk7CiAgICAgICAgYnJlYWs7CgogICAgICBkZWZhdWx0OgogICAgICAgIGNvbnNvbGUud2FybigiVW5oYW5kbGVkIG1lc3NhZ2UgaW4gZG93bnNhbXBsaW5nX3dvcmtlci50czogIi5jb25jYXQoZXZlbnQuZGF0YS5jb21tYW5kKSk7CiAgICAgICAgYnJlYWs7CiAgICB9CiAgfTsKCn0oKSk7Cgo=', null, false);
  /* eslint-enable */

  var DownsamplerWorkerFactory = /*#__PURE__*/function () {
    function DownsamplerWorkerFactory() {
      _classCallCheck(this, DownsamplerWorkerFactory);
    }

    _createClass(DownsamplerWorkerFactory, null, [{
      key: "create",
      value: function () {
        var _create = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(inputFrequency, outputFrequency, frameLength) {
          var downsamplingWorker, workerPromise;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  downsamplingWorker = new WorkerFactory();
                  downsamplingWorker.postMessage({
                    command: 'init',
                    inputSampleRate: inputFrequency,
                    outputSampleRate: outputFrequency,
                    frameLength: frameLength
                  });
                  workerPromise = new Promise(function (resolve, reject) {
                    downsamplingWorker.onmessage = function (event) {
                      if (event.data.command === 'ds-ready') {
                        resolve(downsamplingWorker);
                      } else if (event.data.command === 'ds-failed') {
                        reject(event.data.message);
                      }
                    };
                  });
                  return _context.abrupt("return", workerPromise);

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function create(_x, _x2, _x3) {
          return _create.apply(this, arguments);
        }

        return create;
      }()
    }]);

    return DownsamplerWorkerFactory;
  }();

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() { }; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var WebVoiceProcessor = /*#__PURE__*/function () {
    function WebVoiceProcessor(inputMediaStream, audioContext, audioSource, downsamplingWorker, options) {
      var _options$start;

      _classCallCheck(this, WebVoiceProcessor);

      this._audioDumpPromise = null;
      this._audioDumpReject = null;
      this._audioDumpResolve = null;
      this._isReleased = false;
      this._options = options;

      if (options.engines === undefined) {
        this._engines = [];
      } else {
        this._engines = options.engines;
      }

      this._isRecording = (_options$start = options.start) !== null && _options$start !== void 0 ? _options$start : true;
      this._mediaStream = inputMediaStream;
      this._downsamplingWorker = downsamplingWorker;
      this._audioContext = audioContext;
      this._audioSource = audioSource;

      this._setupAudio();
    }

    _createClass(WebVoiceProcessor, [{
      key: "_setupAudio",
      value: function () {
        var _setupAudio2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
          var _this = this;

          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  this._node = this._audioContext.createScriptProcessor(4096, 1, 1);

                  this._node.onaudioprocess = function (event) {
                    if (_this._isRecording) {
                      _this._downsamplingWorker.postMessage({
                        command: 'process',
                        inputFrame: event.inputBuffer.getChannelData(0)
                      });
                    }
                  };

                  this._audioSource.connect(this._node);

                  this._node.connect(this._audioContext.destination);

                  this._downsamplingWorker.onmessage = function (event) {
                    switch (event.data.command) {
                      case 'output':
                        {
                          var _iterator = _createForOfIteratorHelper(_this._engines),
                            _step;

                          try {
                            for (_iterator.s(); !(_step = _iterator.n()).done;) {
                              var engine = _step.value;
                              engine.postMessage({
                                command: 'process',
                                inputFrame: event.data.outputFrame
                              });
                            }
                          } catch (err) {
                            _iterator.e(err);
                          } finally {
                            _iterator.f();
                          }

                          break;
                        }

                      case 'audio_dump_complete':
                        {
                          _this._audioDumpResolve(event.data.blob);

                          _this._audioDumpPromise = null;
                          _this._audioDumpResolve = null;
                          _this._audioDumpReject = null;
                          break;
                        }

                      default:
                        {
                          console.warn("Received unexpected command: ".concat(event.data.command));
                          break;
                        }
                    }
                  };

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function _setupAudio() {
          return _setupAudio2.apply(this, arguments);
        }

        return _setupAudio;
      }()
    }, {
      key: "audioDump",
      value: function () {
        var _audioDump = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
          var _this2 = this;

          var durationMs,
            _args2 = arguments;
          return regenerator.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  durationMs = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 3000;

                  if (!(this._audioDumpPromise !== null)) {
                    _context2.next = 3;
                    break;
                  }

                  return _context2.abrupt("return", Promise.reject('Audio dump already in progress'));

                case 3:
                  this._downsamplingWorker.postMessage({
                    command: 'start_audio_dump',
                    durationMs: durationMs
                  });

                  this._audioDumpPromise = new Promise(function (resolve, reject) {
                    _this2._audioDumpResolve = resolve;
                    _this2._audioDumpReject = reject;
                  });
                  return _context2.abrupt("return", this._audioDumpPromise);

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function audioDump() {
          return _audioDump.apply(this, arguments);
        }

        return audioDump;
      }()
    }, {
      key: "release",
      value: function () {
        var _release = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
          return regenerator.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (this._isReleased) {
                    _context3.next = 9;
                    break;
                  }

                  this._isReleased = true;
                  this._isRecording = false;

                  this._downsamplingWorker.postMessage({
                    command: 'release'
                  });

                  this._downsamplingWorker.terminate();

                  this._mediaStream.getTracks().forEach(function (track) {
                    track.stop();
                  });

                  this._node.disconnect();

                  _context3.next = 9;
                  return this._audioContext.close();

                case 9:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function release() {
          return _release.apply(this, arguments);
        }

        return release;
      }()
    }, {
      key: "stop",
      value: function () {
        var _stop = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4() {
          return regenerator.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt("return", this.release());

                case 1:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function stop() {
          return _stop.apply(this, arguments);
        }

        return stop;
      }()
    }, {
      key: "pause",
      value: function pause() {
        this._isRecording = false;

        this._downsamplingWorker.postMessage({
          command: 'reset'
        });
      }
    }, {
      key: "start",
      value: function () {
        var _start = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5() {
          var _yield$WebVoiceProces, _yield$WebVoiceProces2, microphoneStream, audioContext, audioSource, downsamplingWorker;

          return regenerator.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  this._isRecording = true;

                  if (!this._isReleased) {
                    _context5.next = 17;
                    break;
                  }

                  this._isReleased = false;
                  this._isRecording = true;
                  _context5.next = 6;
                  return WebVoiceProcessor._initMic(this._options);

                case 6:
                  _yield$WebVoiceProces = _context5.sent;
                  _yield$WebVoiceProces2 = _slicedToArray(_yield$WebVoiceProces, 4);
                  microphoneStream = _yield$WebVoiceProces2[0];
                  audioContext = _yield$WebVoiceProces2[1];
                  audioSource = _yield$WebVoiceProces2[2];
                  downsamplingWorker = _yield$WebVoiceProces2[3];
                  this._mediaStream = microphoneStream;
                  this._downsamplingWorker = downsamplingWorker;
                  this._audioContext = audioContext;
                  this._audioSource = audioSource;

                  this._setupAudio();

                case 17:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function start() {
          return _start.apply(this, arguments);
        }

        return start;
      }()
    }, {
      key: "audioContext",
      get: function get() {
        return this._audioContext;
      }
    }, {
      key: "audioSource",
      get: function get() {
        return this._audioSource;
      }
    }, {
      key: "mediaStream",
      get: function get() {
        return this._mediaStream;
      }
    }, {
      key: "isRecording",
      get: function get() {
        return this._isRecording;
      }
    }, {
      key: "isReleased",
      get: function get() {
        return this._isReleased;
      }
    }], [{
      key: "_initMic",
      value: function () {
        var _initMic2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(options) {
          var microphoneStream, audioContext, audioSource, downsamplingWorker;
          return regenerator.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return navigator.mediaDevices.getUserMedia({
                    audio: {
                      deviceId: options.deviceId ? {
                        exact: options.deviceId
                      } : undefined
                    }
                  });

                case 2:
                  microphoneStream = _context6.sent;
                  audioContext = new (window.AudioContext || window.webkitAudioContext)();
                  audioSource = audioContext.createMediaStreamSource(microphoneStream);
                  _context6.next = 7;
                  return DownsamplerWorkerFactory.create(audioSource.context.sampleRate, options.outputSampleRate, options.frameLength);

                case 7:
                  downsamplingWorker = _context6.sent;
                  return _context6.abrupt("return", [microphoneStream, audioContext, audioSource, downsamplingWorker]);

                case 9:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        function _initMic(_x) {
          return _initMic2.apply(this, arguments);
        }

        return _initMic;
      }()
    }, {
      key: "init",
      value: function () {
        var _init = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7(options) {
          var _yield$this$_initMic, _yield$this$_initMic2, microphoneStream, audioContext, audioSource, downsamplingWorker;

          return regenerator.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return this._initMic(options);

                case 2:
                  _yield$this$_initMic = _context7.sent;
                  _yield$this$_initMic2 = _slicedToArray(_yield$this$_initMic, 4);
                  microphoneStream = _yield$this$_initMic2[0];
                  audioContext = _yield$this$_initMic2[1];
                  audioSource = _yield$this$_initMic2[2];
                  downsamplingWorker = _yield$this$_initMic2[3];
                  return _context7.abrupt("return", new WebVoiceProcessor(microphoneStream, audioContext, audioSource, downsamplingWorker, options));

                case 9:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function init(_x2) {
          return _init.apply(this, arguments);
        }

        return init;
      }()
    }]);

    return WebVoiceProcessor;
  }();

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function browserCompatibilityCheck() {
    var _isSecureContext = window.isSecureContext;

    var _mediaDevices = navigator.mediaDevices !== undefined;

    var _webkitGetUserMedia = navigator.webkitGetUserMedia !== undefined;

    var _Worker = window.Worker !== undefined;

    var _WebAssembly = (typeof WebAssembly === "undefined" ? "undefined" : _typeof(WebAssembly)) === 'object';

    var _AudioWorklet = typeof AudioWorklet === 'function';

    var _picovoice = _mediaDevices && _WebAssembly && _Worker;

    return {
      _picovoice: _picovoice,
      AudioWorklet: _AudioWorklet,
      isSecureContext: _isSecureContext,
      mediaDevices: _mediaDevices,
      WebAssembly: _WebAssembly,
      webKitGetUserMedia: _webkitGetUserMedia,
      Worker: _Worker
    };
  }

  exports.WebVoiceProcessor = WebVoiceProcessor;
  exports.browserCompatibilityCheck = browserCompatibilityCheck;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=index.js.map
