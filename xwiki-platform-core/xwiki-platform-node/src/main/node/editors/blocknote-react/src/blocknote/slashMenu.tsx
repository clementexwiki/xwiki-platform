/**
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */

import { LinkEditor } from "../components/links/LinkEditor";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiLink } from "react-icons/ri";
import type { EditorType } from ".";
import type { LinkEditionContext } from "../misc/linkSuggest";
import type { Components, DefaultReactSuggestionItem } from "@blocknote/react";

export function useCustomSlashMenuItems(
  editor: EditorType,
  linkEditionCtx: LinkEditionContext,
  Components: Components | undefined,
): DefaultReactSuggestionItem[] {
  const { t } = useTranslation();

  const [isOpened, setIsOpened] = useState(false);
  const insertLink = useCallback(() => {
    setIsOpened(true);
  }, [editor]);

  console.log({ Components });

  if (!Components) {
    return [];
  }

  return [
    {
      title: t("blocknote.slashMenu.insertLink.label"),
      group: "Others",
      icon: (
        <Components.Generic.Popover.Root opened={isOpened}>
          <Components.Generic.Popover.Trigger>
            {/* TODO: hide tooltip on click
              (note: this comment is from BlockNote's source code but may remain relevant here) */}
            <Components.FormattingToolbar.Button
              className={"bn-button"}
              label={"TODO"}
              icon={<RiLink />}
              onClick={() => setIsOpened(true)}
            />
          </Components.Generic.Popover.Trigger>
          <Components.Generic.Popover.Content
            className={"bn-popover-content bn-form-popover"}
            variant={"form-popover"}
          >
            <LinkEditor
              creationMode
              linkEditionCtx={linkEditionCtx}
              current={{
                title: "nope",
                url: "nope.com",
              }}
              updateLink={({ url }) => {
                // TODO: insertLink
              }}
            />
          </Components.Generic.Popover.Content>
        </Components.Generic.Popover.Root>
      ),
      onItemClick: () => {},
    },
  ];
}
