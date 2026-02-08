"""Modify t_places: rename role to digitizer, create shared

Revision ID: ca0ecf8667af
Revises: c3db57568f88
Create Date: 2026-02-08 13:51:50.955815

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ca0ecf8667af'
down_revision = 'c3db57568f88'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('t_places', 'id_role', schema='gn_commons', nullable=False, new_column_name='id_digitizer')
    op.add_column(
        schema="gn_commons",
        table_name="t_places",
        column=sa.Column("shared", sa.Boolean, nullable=False, server_default=sa.false()),
    )


def downgrade():
    op.alter_column('t_places', 'id_digitizer', schema='gn_commons', nullable=False, new_column_name='id_role')
    op.drop_column('t_places', 'shared', schema='gn_commons')
