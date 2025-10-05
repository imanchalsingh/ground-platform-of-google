/**
 * Copyright 2024 The Ground Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { GroundProtos } from '@ground/proto';

import Pb = GroundProtos.ground.v1beta1;

/**
 * Checks if a Location of Interest (LOI) is accessible to a given user.
 *
 * Accessibility rules:
 * - LOI is imported (source === IMPORTED), OR
 * - ownerId is null (ignore ownership), OR
 * - ownerId matches the LOI's owner.
 *
 * @param loi The Location of Interest object to check.
 * @param ownerId The ID of the user requesting access. Pass `null` to bypass ownership check.
 * @returns True if the LOI is accessible, false otherwise.
 */
export function isAccessibleLoi(
  loi: Pb.ILocationOfInterest,
  ownerId: string | null
): boolean {
  // Explicit boolean cast for clarity
  return Boolean(
    loi.source === Pb.LocationOfInterest.Source.IMPORTED ||
      ownerId === null ||
      loi.ownerId === ownerId
  );
}

/**
 * Simple string formatter.
 * Replaces `{0}`, `{1}`, etc. in a string with provided arguments.
 *
 * Example:
 *   stringFormat("Hello {0}, your score is {1}", "Alice", 95)
 *   -> "Hello Alice, your score is 95"
 *
 * @param s The string template containing placeholders.
 * @param args Values to replace placeholders with.
 * @returns Formatted string.
 */
export function stringFormat(s: string, ...args: Array<string | number>): string {
  return s.replace(/\{(\d+)\}/g, (_, index) => {
    const i = parseInt(index, 10);
    return args[i] !== undefined ? String(args[i]) : `{${i}}`;
  });
}
