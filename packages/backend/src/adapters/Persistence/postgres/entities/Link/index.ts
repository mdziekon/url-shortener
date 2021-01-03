import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Link, LINK_URL_MAX_LENGTH } from '../../../../../core/entities/Link';
import { UID_LENGTH } from '../../../../../core/utils/generateNewRandomLinkUid';

@Entity()
export class LinkDbEntity implements Link {
  @PrimaryKey({
    length: UID_LENGTH,
  })
  linkUid: string;

  @Property({
    length: LINK_URL_MAX_LENGTH,
  })
  linkUrl: string;

  constructor(props: LinkDbEntity) {
    this.linkUid = props.linkUid;
    this.linkUrl = props.linkUrl;
  }
}
