import { elementFromHash, elementFromTarget, Hash } from ".";

// tslint:disable-next-line: no-commented-code
// tslint:disable: no-expression-statement
// tslint:disable: no-object-mutation
// tslint:disable: readonly-array

describe("elementFromHash", () => {
  test("finds element by ID", () => {
    const div = window.document.createElement("div");
    div.id = "test-id";
    document.body.appendChild(div);
    expect(elementFromHash("#test-id")).toBe(div);
  });

  const elementFromHashTable: ReadonlyArray<
    [Hash, HTMLElement | undefined]
  > = [
    ["#", window.document.documentElement],
    ["#top", window.document.documentElement],
    ["", undefined],
    ["a", undefined],
    [null as unknown as Hash, undefined],
    [undefined as unknown as Hash, undefined],
    [true as unknown as Hash, undefined],
    [1 as unknown as Hash, undefined],
    [{}  as unknown as Hash, undefined],
  ];

  describe.each(elementFromHashTable)(
    "returns expected element",
    (hash, expected) => {
      test(`for hash ${hash}`, () => {
        expect(elementFromHash(hash)).toBe(expected);
      });
    },
  );
});

describe("elementFromTarget", () => {
  test("returns undefined for malformed CSS query", () => {
    expect(elementFromTarget("a[")).toBeUndefined();
  });
});
