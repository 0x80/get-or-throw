import { describe, expect, it } from "vitest";
import { getOrThrow, got } from "./get-or-throw";

describe("get-or-throw", () => {
  describe("array access", () => {
    it("should get value at positive index", () => {
      const arr = [1, 2, 3];
      expect(got(arr, 1)).toBe(2);
      expect(getOrThrow(arr, 1)).toBe(2);
    });

    it("should support negative indexing", () => {
      const arr = [1, 2, 3];
      expect(got(arr, -1)).toBe(3);
      expect(got(arr, -2)).toBe(2);
    });

    it("should throw on out of bounds index", () => {
      const arr = [1, 2, 3];
      expect(() => got(arr, 3)).toThrow("Index 3 is out of bounds.");
    });

    it("should throw on null values", () => {
      const arr = [1, null, 3];
      expect(() => got(arr, 1)).toThrow("Value at index 1 is null.");
    });

    it("should throw on undefined values", () => {
      const arr = [1, undefined, 3];
      expect(() => got(arr, 1)).toThrow("Value at index 1 is undefined.");
    });
  });

  describe("object access", () => {
    it("should get value at existing key", () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(got(obj, "b")).toBe(2);
      expect(getOrThrow(obj, "b")).toBe(2);
    });

    it("should throw on non-existent key", () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(() => got(obj, "d" as keyof typeof obj)).toThrow(
        'Key "d" does not exist in the object.',
      );
    });

    it("should throw on null values", () => {
      const obj = { a: 1, b: null, c: 3 };
      expect(() => got(obj, "b")).toThrow('Value at key "b" is null.');
    });

    it("should throw on undefined values", () => {
      const obj = { a: 1, b: undefined, c: 3 };
      expect(() => got(obj, "b")).toThrow('Value at key "b" is undefined.');
    });
  });

  describe("custom error messages", () => {
    it("should use custom error message when provided", () => {
      const obj = { a: 1, b: 2, c: 3 };
      const key = "d";
      expect(() =>
        got(obj, key as keyof typeof obj, `Failed to find ${key}`),
      ).toThrow("Failed to find d");
    });
  });
});
